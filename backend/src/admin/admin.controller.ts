import { Controller, Get, Post, Body, Patch, Param, Delete, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Prisma } from '@prisma/client';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @Get('validate')
  validate(@Headers('email') email: string){
    return this.adminService.validate(email || "None");
  }

  @Post()
  create(@Headers('api-key') apiKey: string, @Body() createAdminDto: Prisma.Nexus_AdminsCreateInput) {
    if (!this.adminService.validateApiKey(apiKey)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid API key',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Invalid API key'
      });
    };
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll(@Headers('api-key') apiKey: string) {
    if (!this.adminService.validateApiKey(apiKey)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid API key',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Invalid API key'
      });
    };
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Headers('api-key') apiKey: string, @Param('id') id: string) {
    if (!this.adminService.validateApiKey(apiKey)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid API key',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Invalid API key'
      });
    };
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Headers('api-key') apiKey: string, @Param('id') id: string, @Body() updateAdminDto: Prisma.Nexus_AdminsUpdateInput) {
    if (!this.adminService.validateApiKey(apiKey)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid API key',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Invalid API key'
      });
    };
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Headers('api-key') apiKey: string, @Param('id') id: string) {
    if (!this.adminService.validateApiKey(apiKey)) {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Invalid API key',
      }, HttpStatus.FORBIDDEN, {
        cause: 'Invalid API key'
      });
    };
    return this.adminService.remove(+id);
  }
}
