const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const readline = require("readline");

const extractComments = (node) => {
  const comments = [];
  const commentRanges = ts.getLeadingCommentRanges(node.getFullText(), 0) || [];
  commentRanges.forEach(range => {
    const comment = node.getFullText().slice(range.pos, range.end).trim();
    if (comment.startsWith('//')) {
      comments.push(comment.slice(2).trim());
    }
    if (comment.startsWith('/*')) {
      comments.push('\n ');
      comments.push(comment.slice(2, -2).trim());
    }
  });
  return comments;
};

const convertTypeToModel = (typeName, typeMembers) => {
  let model = `model ${typeName} {\n`;
  for (const member of typeMembers) {
    const name = member.name.escapedText;
    const type = member.type.kind === ts.SyntaxKind.TypeReference ? member.type.typeName.getText() : member.type.getText();
    const optional = member.questionToken ? '?' : '';
    const prismaType = type === 'string' ? 'String' :
      type === 'number' ? 'Int' :
      type === 'boolean' ? 'Boolean' : 
      type === 'Date' ? 'DateTime' : type;
    const comments = member.comments ? ` ${member.comments.join(' ')}` : '';
    model += `  ${name} ${prismaType}${optional}${comments}\n`;
  }
  model += '}\n';
  return model;
};

const getEnums = (baseSchema, pluginTypePath) => {
  const enumPath = path.join(pluginTypePath, 'types.ts');
  if (fs.existsSync(enumPath)) {
    const sourceFile = ts.createSourceFile(
      enumPath,
      fs.readFileSync(enumPath, 'utf8'),
      ts.ScriptTarget.ESNext,
      true
    );
    sourceFile.forEachChild(node => {
      if (ts.isEnumDeclaration(node)) {
        const enumName = node.name.escapedText;
        let enumValues = '';
        node.members.forEach(member => {
          const comments = extractComments(member);
          enumValues += `  ${member.name.escapedText}${comments.length > 0 ? ' ' + comments.join(' ') : ''}\n`;
        });
        baseSchema += `\nenum ${enumName} {\n${enumValues}}\n`;
      }
    });
  }
  return baseSchema;
}

const getModels = (baseSchema, pluginTypePath) => {
  fs.readdirSync(pluginTypePath).forEach(pluginDir => {
    const typesFilePath = path.join(pluginTypePath, pluginDir, 'types.ts');
    if (fs.existsSync(typesFilePath)) {
      const sourceFile = ts.createSourceFile(
        typesFilePath,
        fs.readFileSync(typesFilePath, 'utf8'),
        ts.ScriptTarget.ESNext,
        true
      );
      sourceFile.forEachChild(node => {
        if (ts.isTypeAliasDeclaration(node) && ts.isTypeLiteralNode(node.type)) {
          const typeName = node.name.escapedText;
          let previousTypeMember = null;
          const typeMembers = node.type.members.map((member, _) => {
            const comments = extractComments(member);
            if (previousTypeMember && comments.length > 0) {
              previousTypeMember.comments = comments;
            }
            const typeMember = {
              name: member.name,
              type: member.type,
              questionToken: member.questionToken,
              comments: []
            };
            previousTypeMember = typeMember;
            return typeMember;
          });
          const prismaModel = convertTypeToModel(typeName, typeMembers);
          baseSchema += '\n' + prismaModel;
        }
      });
    }
  });
  return baseSchema;
}

const merge_schemas = (baseSchema, pluginsPath, pluginType) => {
  let updatedSchema = baseSchema;
  const pluginTypePath = path.join(pluginsPath, pluginType);
  updatedSchema = getEnums(updatedSchema, pluginTypePath);
  updatedSchema = getModels(updatedSchema, pluginTypePath);
  return updatedSchema;
};

const getMasterSchema = () => {
  const pluginsPath = path.join(__dirname, '../plugins');
  const baseSchemaPath = path.join(__dirname, '../../backend/prisma/schema.prisma');
  const masterSchemaPath = path.join(__dirname, '../../backend/prisma/schema.master.prisma');

  let baseSchema = fs.readFileSync(masterSchemaPath, 'utf8');
  baseSchema = merge_schemas(baseSchema, pluginsPath, 'apps');
  baseSchema = merge_schemas(baseSchema, pluginsPath, 'core');
  baseSchema = merge_schemas(baseSchema, pluginsPath, 'templates');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question("Would you like to view the updated schema before writing it to the file? (y/n)\n", (answer) => {
    if (answer === 'y') {
      console.log(baseSchema);
      rl.question("Would you like to write the updated schema to the file? (y/n)\n", (answer2) => {
        if (answer2 === 'y') {
          fs.writeFileSync(baseSchemaPath, baseSchema);
        }
        rl.close();
      });
    } else {
      fs.writeFileSync(baseSchemaPath, baseSchema);
      rl.close();
    }
  });
}

getMasterSchema();
