export const NovelTextStatusEnum = {
  TEMP_SAVE: 'temp', // 임시 저장
  COMPLETED: 'complete', // 작성 완료
} as const;

export type NovelTextStatusType = (typeof NovelTextStatusEnum)[keyof typeof NovelTextStatusEnum];

export const NovelTextStatusDescription = {
  enum: NovelTextStatusEnum,
  example: NovelTextStatusEnum.TEMP_SAVE,
  description: `${NovelTextStatusEnum.TEMP_SAVE} : 임시저장 
                ${NovelTextStatusEnum.COMPLETED} : 완료`,
};
