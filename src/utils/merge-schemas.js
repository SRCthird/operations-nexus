const fs = require('fs');
const path = require('path');
const ts = require('typescript');


const extractComments = (node) => {
  const comments = [];
  const commentRanges = ts.getLeadingCommentRanges(node.getFullText(), 0) || [];
  commentRanges.forEach(range => {
    const comment = node.getFullText().slice(range.pos, range.end).trim();
    if (comment.startsWith('//')) {
      comments.push(comment.slice(2).trim());
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
    const prismaType = type === 'string' ? 'String' : type === 'number' ? 'Int' : type;
    const comments = member.comments ? ` ${member.comments.join(' ')}` : '';
    model += `  ${name} ${prismaType}${optional}${comments}\n`;
  }
  model += '}\n';
  return model;
};

const getEnums = (baseSchema, pluginTypePath) => {
  const enumPath = path.join(pluginTypePath, 'types.ts');
  let updatedSchema = baseSchema;
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
        updatedSchema += `\nenum ${enumName} {\n${enumValues}}\n`;
      }
    });
  }
  return updatedSchema;
}

const getModels = (baseSchema, pluginTypePath) => {
  let updatedSchema = baseSchema;
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
          const typeMembers = node.type.members.map((member, index) => {
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
          if (previousTypeMember && previousTypeMember.comments.length === 0) {
            // Handle comments for the last member
            previousTypeMember.comments = extractComments(node.type.members[node.type.members.length - 1]);
          }
          const prismaModel = convertTypeToModel(typeName, typeMembers);
          updatedSchema += '\n' + prismaModel;
        }
      });
    }
  });
  return updatedSchema;
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
  baseSchema = merge_schemas(baseSchema, pluginsPath, 'templates');

  console.log(baseSchema);
  // Uncomment this line to write the merged schema to file
  // fs.writeFileSync(baseSchemaPath, baseSchema);
}

getMasterSchema();
