export const NovelRoomStatusEnum = {
  SERIES: 'series', // 연재중
  COMPLETE: 'complete', // 연재 완료
  REMOVE: 'remove', // 삭제
} as const;

export type NovelRoomStatusType = (typeof NovelRoomStatusEnum)[keyof typeof NovelRoomStatusEnum];

export const NovelRoomStatuDescription = {
  enum: NovelRoomStatusEnum,
  example: NovelRoomStatusEnum.SERIES,
  description: `${NovelRoomStatusEnum.SERIES} : 연재중, 
                  ${NovelRoomStatusEnum.COMPLETE} : 연재완료,
                  ${NovelRoomStatusEnum.REMOVE} : 삭제`,
};
