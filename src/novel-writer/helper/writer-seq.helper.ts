import { Injectable } from '@nestjs/common';
import { NovelWriterEntity } from '../entities/novel-writer.entity';
import { getSize } from '../../commons/util/data.helper';

@Injectable()
export class WriterSeqHelper {
  /**
   * 다음 작가를 반환합니다.
   *
   * @param {NovelWriterEntity[]} writers 작가 목록
   * @returns {NovelWriterEntity} 다음 작가
   */
  getNextWriter(writers: NovelWriterEntity[]): NovelWriterEntity {
    const currentWriter = writers.filter((writer) => writer.isCurrentlyWriter())[0];
    const nextWriterSeq = currentWriter.getNextSeq(getSize(writers));
    return writers.filter((writer) => writer.writingSeq === nextWriterSeq)[0];
  }
}
