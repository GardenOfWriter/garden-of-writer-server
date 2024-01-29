import { PickType } from '@nestjs/swagger';
import { ChapterDto } from '../chapter.dto';

export class ChangeTitleDto extends PickType(ChapterDto, ['title']) {}
