export const NovelAttendBoardStatusEnum = {
  WRITING: 'writing', // 작성중
  REVIEW: 'review', // 연재 검토중
  APPROVE: 'approve', // 연재 승인
  REJECT: 'reject', // 연재 거절
} as const;

export type NovelAttendBoardStatusType = (typeof NovelAttendBoardStatusEnum)[keyof typeof NovelAttendBoardStatusEnum];
