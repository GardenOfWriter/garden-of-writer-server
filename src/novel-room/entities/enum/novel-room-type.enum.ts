export const NovelRoomTypeEnum = {
  SOLO: 'solo',
  GROUP2: 'group2',
  GROUP3: 'group3',
  GROUP4: 'group4',
  GROUP5: 'group5',
} as const;

export type NovelRoomType =
  (typeof NovelRoomTypeEnum)[keyof typeof NovelRoomTypeEnum];
