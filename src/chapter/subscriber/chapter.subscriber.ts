import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { ChapterEntity } from '../entities/chapter.entity';

@EventSubscriber()
export class ChapterSubscriber implements EntitySubscriberInterface<ChapterEntity> {
  //   constructor(
  //     @InjectRepository(ChapterEntity)
  //     private chapterRepository: Repository<ChapterEntity>,
  //   ) {}

  listenTo() {
    return ChapterEntity;
  }

  async beforeInsert(event: InsertEvent<ChapterEntity>) {
    /**
     *  Triiger로 회차설정하기
     */
    const saveChapter = event.entity;
    const chapterRepository = event.manager.getRepository(ChapterEntity);
    const currentNo = await chapterRepository.count({
      where: {
        novelRoom: {
          id: saveChapter.novelRoom.id,
        },
      },
    });

    saveChapter.no = currentNo + 1;
  }
}
