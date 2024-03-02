export const NovelRoomTypeEnum = {
  SOLO: 1,
  GROUP2: 2,
  GROUP3: 3,
  GROUP4: 4,
  GROUP5: 5,
} as const;

export type NovelRoomType =
  (typeof NovelRoomTypeEnum)[keyof typeof NovelRoomTypeEnum];

export const RoomTypeDescription = {
  enum: NovelRoomTypeEnum,
  example: NovelRoomTypeEnum.SOLO,
  description: `공방 타입  혼자 : ${NovelRoomTypeEnum.SOLO},
                         2명 : ${NovelRoomTypeEnum.GROUP2},
                         3명 : ${NovelRoomTypeEnum.GROUP3},
                         4명 : ${NovelRoomTypeEnum.GROUP4},
                         5명 : ${NovelRoomTypeEnum.GROUP5}`,
};
