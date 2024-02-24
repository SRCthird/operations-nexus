import { Controller, Get, Post, Patch, 
         Param, Delete, UseInterceptors, 
         UploadedFile, ParseFilePipe, 
         MaxFileSizeValidator, FileTypeValidator, 
         Res } from '@nestjs/common';
import { PowerpointService } from './powerpoint.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('powerpoint')
export class PowerpointController {
  constructor(private readonly powerpointService: PowerpointService) {}

  @Post(':location')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Param('location') location: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1_073_741_824 }), // Allow up to 1 GB
        new FileTypeValidator({ fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }),
      ],
    }),
  ) file: Express.Multer.File) {
    return this.powerpointService.create(location, file);
  }

  @Get(':location')
  async findAll(@Param('location') location?: string) {
    return this.powerpointService.findAll(location);
  }

  @Get(':location/:name')
  async findOne(@Param('location') location: string, @Param('name') encodedName: string, @Res() res: Response) {
    const name = decodeURIComponent(encodedName);
    const filePath = await this.powerpointService.findOne(location, name);
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.sendFile(filePath);
  }

  @Patch(':location/:name')
  @UseInterceptors(FileInterceptor('file'))
  async update(@Param('location') location: string, @Param('name') encodedName: string, @UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({ maxSize: 1_073_741_824 }), // Allow up to 1 GB
        new FileTypeValidator({ fileType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }),
      ],
    }),
  ) file: Express.Multer.File) {
    const name = decodeURIComponent(encodedName);
    return this.powerpointService.update(location, name, file);
  }

  @Delete(':location/:name')
  async remove(@Param('location') location: string, @Param('name') name: string) {
    return this.powerpointService.remove(location, name);
  }
}
