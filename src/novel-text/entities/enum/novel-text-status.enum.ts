export const NovelTextStatusEnum = {
  TEMP_SAVE: 'temp', // 임시 저장
  COMPLETED: 'complete', // 작성 완료
} as const;

export type NovelTextStatusType = (typeof NovelTextStatusEnum)[keyof typeof NovelTextStatusEnum];
