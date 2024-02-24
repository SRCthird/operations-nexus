import { Injectable } from '@nestjs/common';
import { CreatePowerpointDto } from './dto/create-powerpoint.dto';
import { UpdatePowerpointDto } from './dto/update-powerpoint.dto';

@Injectable()
export class PowerpointService {
  create(createPowerpointDto: CreatePowerpointDto) {
    return 'This action adds a new powerpoint';
  }

  findAll() {
    return `This action returns all powerpoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} powerpoint`;
  }

  update(id: number, updatePowerpointDto: UpdatePowerpointDto) {
    return `This action updates a #${id} powerpoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} powerpoint`;
  }
}
