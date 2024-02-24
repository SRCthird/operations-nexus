import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PowerpointService } from './powerpoint.service';
import { CreatePowerpointDto } from './dto/create-powerpoint.dto';
import { UpdatePowerpointDto } from './dto/update-powerpoint.dto';

@Controller('powerpoint')
export class PowerpointController {
  constructor(private readonly powerpointService: PowerpointService) {}

  @Post()
  create(@Body() createPowerpointDto: CreatePowerpointDto) {
    return this.powerpointService.create(createPowerpointDto);
  }

  @Get()
  findAll() {
    return this.powerpointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.powerpointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePowerpointDto: UpdatePowerpointDto) {
    return this.powerpointService.update(+id, updatePowerpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.powerpointService.remove(+id);
  }
}
