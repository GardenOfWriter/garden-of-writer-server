import { PickType } from '@nestjs/swagger';
import { NovelWirterDto } from '../novel-writer.dto';

export class UpdateNovelWriterStatusRequestDto extends PickType(NovelWirterDto, ['status']) {}
