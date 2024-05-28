import { Controller, Get, Post, Patch, 
         Param, Delete, UseInterceptors, 
         UploadedFile, ParseFilePipe, 
         MaxFileSizeValidator, FileTypeValidator, 
         Res, 
         Header} from '@nestjs/common';
import { StaticService } from './static.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('static')
export class StaticController {
  constructor(private readonly staticService: StaticService) {}

  @Post(':location')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Param('location') location: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1_073_741_824 }), // Allow up to 1 GB
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    }),
  ) file: Express.Multer.File) {
    return this.staticService.create(location, file);
  }

  @Get(':location')
  async findAll(@Param('location') location?: string) {
    return this.staticService.findAll(location);
  }

  @Get(':location/:name')
  @Header('Content-Type', 'image')
  async findOne(@Param('location') location: string, @Param('name') encodedName: string, @Res() res: Response) {
    const name = decodeURIComponent(encodedName);
    const filePath = await this.staticService.findOne(location, name);
    res.sendFile(filePath);
  }

  @Patch(':location/:name')
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('location') location: string, @Param('name') encodedName: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1_073_741_824 }), // Allow up to 1 GB
        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
      ],
    }),
  ) file: Express.Multer.File) {
    const name = decodeURIComponent(encodedName);
    return this.staticService.update(location, name, file);
  }

  @Delete(':location/:name')
  async remove(@Param('location') location: string, @Param('name') name: string) {
    return this.staticService.remove(location, name);
  }
}
