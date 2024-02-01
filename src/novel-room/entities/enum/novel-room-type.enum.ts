export const NovelRoomTypeEnum = {
  SOLO: 1,
  GROUP2: 2,
  GROUP3: 3,
  GROUP4: 4,
  GROUP5: 5,
} as const;

export type NovelRoomType =
  (typeof NovelRoomTypeEnum)[keyof typeof NovelRoomTypeEnum];
