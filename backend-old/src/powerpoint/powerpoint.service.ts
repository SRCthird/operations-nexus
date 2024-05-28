import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PowerpointService {
  constructor(private readonly databaseService: DatabaseService) { }
  private readonly STATIC_DIR = path.join(__dirname, '..', 'public');

  /**
   *  CRUD definitions 
   */

  async create(location: string, file: Express.Multer.File): Promise<any> {
    if (!this.validateLocation(location)) {
      throw new NotFoundException(`location '${location}' does not exist.`);
    }

    const directoryPath = path.join(this.STATIC_DIR, 'pptx', location);
    fs.mkdirSync(directoryPath, { recursive: true });
    const filePath = path.join(directoryPath, file.originalname);
    fs.writeFileSync(filePath, file.buffer);

    return {
      message: 'File uploaded successfully',
      filePath: filePath,
    };
  }

  async findAll(location?: string): Promise<string[]> {
    if (!(await this.validateLocation(location))) {
      throw new NotFoundException(`location '${location}' does not exist.`);
    }
    
    let response = []
    const dir = path.join(this.STATIC_DIR, 'pptx', location);

    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
          throw new NotFoundException(`Failed to create directory '${location}'`);
        }
      });
    }
    response = this.readDirectory(location, '.pptx');
    return response
  }

  async findOne(location: string, name: string): Promise<string> {
    const filePath = path.join(this.STATIC_DIR, 'pptx', location, name);
    
    console.log(filePath);

    try {
      await fs.promises.access(filePath, fs.constants.F_OK);
      return filePath;
    } catch (err) {
      throw new NotFoundException(`File '${name}' not found in location '${location}'.`);
    }
  }

  async update(location: string, name: string, file: Express.Multer.File): Promise<object> {
    if (!(await this.validateLocation(location))) {
      throw new NotFoundException(`Location '${location}' does not exist.`);
    }

    const directoryPath = path.join(this.STATIC_DIR, 'pptx', location);
    let filePath: string = path.join(directoryPath, name);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`File '${name}' not found in location '${location}'.`);
    }

    fs.writeFileSync(filePath, file.buffer);
    
    if (name != file.originalname){
      const newFilePath: string = path.join(directoryPath, file.originalname);
      if (fs.existsSync(newFilePath)) {
        throw new Error(`File '${file.originalname}' already exists in location '${location}'.`);
      }
      fs.renameSync(filePath, newFilePath);
      filePath = newFilePath
    }

    return {
      message: 'File updated successfully',
      filePath: filePath,
    };
  }

  async remove(location: string, name: string): Promise<object> {
    if (!(await this.validateLocation(location))) {
      throw new NotFoundException(`Location '${location}' does not exist.`);
    }

    const filePath = path.join(this.STATIC_DIR, 'pptx', location, name);

    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`File '${name}' not found in location '${location}'.`);
    }

    fs.unlinkSync(filePath);

    return {
      message: 'File removed successfully',
      filePath: filePath,
    };
  }


  /**
   *  Utility Methods
   */

  async validateLocation(location: string): Promise<boolean> {
    const result = await this.databaseService.nexus_Department.findUnique({
      where: { department: location },
    });
    return !!result;
  }
  
  readDirectory(location: string, extension: string): string[] {
    const dir = path.join(this.STATIC_DIR, 'pptx', location);
    try {
      const files = fs.readdirSync(dir);
      const allFiles = files
        .filter(file => file.toLowerCase().endsWith(extension))
        .map(file => path.join(location, file));
      return allFiles;
    } catch (err) {
      throw new NotFoundException(`Failed to read '${location}'`);
    }
  }
}
