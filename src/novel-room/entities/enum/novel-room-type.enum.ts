export const novelRoomTypeEnum = {
  SOLO: 'solo',
  GROUP2: 'group2',
  GROUP3: 'group3',
  GROUP4: 'group4',
  GROUP5: 'group5',
};

export type NovelRoomType =
  (typeof novelRoomTypeEnum)[keyof typeof novelRoomTypeEnum];
