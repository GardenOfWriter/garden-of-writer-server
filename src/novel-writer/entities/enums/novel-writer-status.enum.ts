export const NovelWriterStatusEnum = {
  ATTENDING_REVIEW: 'attendingReview', // 참여 검토중
  ATTENDING: 'attending', // 참여중
  ATTENDING_REJECT: 'attendingReject', // 참여반려
  EXIT: 'exit', // 퇴장
} as const;

export type NovelWriterStatusType =
  (typeof NovelWriterStatusEnum)[keyof typeof NovelWriterStatusEnum];
