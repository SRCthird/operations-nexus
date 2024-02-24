import { PartialType } from '@nestjs/mapped-types';
import { CreatePowerpointDto } from './create-powerpoint.dto';

export class UpdatePowerpointDto extends PartialType(CreatePowerpointDto) {}
