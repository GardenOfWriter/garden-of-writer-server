export const WriterStatusEnum = {
  REVIEW: 'review', // 참여 검토중
  ATTENDING: 'attending', // 참여중
  REJECT: 'reject', // 참여반려
  EXIT: 'exit', // 퇴장
} as const;

export type WriterStatusType = (typeof WriterStatusEnum)[keyof typeof WriterStatusEnum];

export const WriterStatusDescription = {
  enum: WriterStatusEnum,
  example: WriterStatusEnum.ATTENDING,
  description: `${WriterStatusEnum.ATTENDING} : 참여중,
                ${WriterStatusEnum.REJECT} : 참여 반려,
                ${WriterStatusEnum.REVIEW} : 참여 검토,
                ${WriterStatusEnum.EXIT} : 퇴장`,
};
