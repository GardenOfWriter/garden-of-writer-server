import { PickType } from '@nestjs/swagger';
import { NovelTextDto } from '../novel-text.dto';

export class UpdateTextNovelRequestDto extends PickType(NovelTextDto, ['content']) {}
