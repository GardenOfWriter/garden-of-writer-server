export const ChapterStatusEnum = {
  WRITING: 'writing', // 작성중
  REVIEW: 'review', // 연재 검토중
  APPROVE: 'approve', // 연재 승인
  REJECT: 'reject', // 연재 거절
} as const;

export type ChapterStatusType =
  (typeof ChapterStatusEnum)[keyof typeof ChapterStatusEnum];

export const ChatperStatusDescription = {
  enum: ChapterStatusEnum,
  example: true,
  description: `${ChapterStatusEnum.WRITING} : 작성중,
                  ${ChapterStatusEnum.REJECT} : 연재검토,
                  ${ChapterStatusEnum.APPROVE}: 연재승인,
                  ${ChapterStatusEnum.REJECT} : 연재거절`,
};
