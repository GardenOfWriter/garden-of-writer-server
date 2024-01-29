import { PickType } from '@nestjs/swagger';
import { ChapterDto } from '../chapter.dto';

export class ApplyChapterDto extends PickType(ChapterDto, ['id']) {}
