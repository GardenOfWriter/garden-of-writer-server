export const NoveTextStatusEnum = {
  TEMP_SAVE: 'temp_save', // 임시 저장
  COMPLETE: 'complete', // 작성 완료
} as const;

export type NovelTextStatusType =
  (typeof NoveTextStatusEnum)[keyof typeof NoveTextStatusEnum];
