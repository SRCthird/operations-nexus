import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DisplaysService, displayCreateDto, displayUpdateDto } from './displays.service';

@Controller('display')
export class DisplaysController {
  constructor(private readonly displaysService: DisplaysService) {}

  @Post()
  create(@Body() createDto: displayCreateDto) {
    return this.displaysService.create(createDto);
  }

  @Get()
  findAll(@Query('departments') department?: string, @Query('search') search?: string) {
    return this.displaysService.findAll(department, search);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    const parsedParam = parseInt(param, 10);
    if (!isNaN(parsedParam)) {
      return this.displaysService.findOne({ id: parsedParam });
    }
    return this.displaysService.findOne({ name: param });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: displayUpdateDto) {
    return this.displaysService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.displaysService.remove(+id);
  }
}
