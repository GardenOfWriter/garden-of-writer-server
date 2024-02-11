/**
 *  TODO : 대표작가 : HOST, 참여작가 : ATTENDEE 로 축약 가능한지 확인
 *  변수 명이 너무 길다
 */
export const NovelWriterCategoryEnum = {
  REPRESENTATIVE_WRITER: 'representativeWriter', // 대표 착가
  PARTICIPATING_WRITER: 'participatingWriter', // 참여 작가
} as const;

export type NovelWriterCategoryType =
  (typeof NovelWriterCategoryEnum)[keyof typeof NovelWriterCategoryEnum];
