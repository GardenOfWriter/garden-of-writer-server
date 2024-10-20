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
   * 예외 처리 진행
   */
  getNextWriter(writers: NovelWriterEntity[]): NovelWriterEntity {
    const currentWriter = writers.find((writer) => writer.isCurrentlyWriter());
    const nextWriterSeq = currentWriter.getNextSeq(getSize(writers));
    const result = writers.find((writer) => writer.writingSeq === nextWriterSeq);
    return result;
  }
}
