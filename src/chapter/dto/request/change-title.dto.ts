import { PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { ChapterDto } from '../chapter.dto';

export class ChangeTitleDto extends PickType(ChapterDto, ['title']) {}
