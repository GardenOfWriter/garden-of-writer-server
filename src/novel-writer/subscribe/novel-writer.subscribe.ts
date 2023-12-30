// import { Inject, Injectable } from '@nestjs/common';
// import {
//   EntitySubscriberInterface,
//   EventSubscriber,
//   InsertEvent,
//   Repository,
//   UpdateEvent,
// } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { NovelWriterEntity } from '../entities/novel-writer.entity';

// @EventSubscriber()
// export class NovelWriterSubscriber
//   implements EntitySubscriberInterface<NovelWriterEntity>
// {
//   //   constructor(
//   //     @InjectRepository(ChapterEntity)
//   //     private chapterRepository: Repository<ChapterEntity>,
//   //   ) {}

//   listenTo() {
//     return NovelWriterEntity;
//   }

//   async beforeInsert(event: InsertEvent<NovelWriterEntity>) {
//     /**
//      *  Triiger로 작가 순서 결정하기
//      */
//   }
//   async beforeUpdate(event: UpdateEvent<NovelWriterEntity>) {
//     if (event.entity) {
//       const { manager, entity } = event;

//       const novelWriterRepository = manager.getRepository(NovelWriterEntity);
//       const currentNo = await novelWriterRepository.count({
//         where: {
//           novelRoom: {
//             id: entity.novelRoom.id,
//           },
//         },
//       });
//       entity.setSeq(currentNo + 1);
//     }
//   }
// }
