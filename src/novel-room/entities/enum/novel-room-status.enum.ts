export const NovelRoomStatusEnum = {
  SERIES: 'series', // 연재중
  COMPLETE: 'complete', // 연재 완료
  REMOVE: 'remove', // 삭제
} as const;

export type NovelRoomStatusType =
  (typeof NovelRoomStatusEnum)[keyof typeof NovelRoomStatusEnum];
