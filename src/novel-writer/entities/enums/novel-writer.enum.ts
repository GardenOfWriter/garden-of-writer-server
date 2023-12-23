export const NovelWriterStatusEnum = {
  REPRESENTATIVE_WRITER: 'representativeWriter', // 대표 착가
  PARTICIPATING_WRITER: 'participatingWriter', // 참여 작가
} as const;

export type NovelWriterStatusType =
  (typeof NovelWriterStatusEnum)[keyof typeof NovelWriterStatusEnum];
