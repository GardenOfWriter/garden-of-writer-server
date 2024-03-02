export const NovelRoomCategoryEnum = {
  NORMAL: 1,
  ROMANCE_DRAMA: 2,
  COMEDY: 3,
  POETRY_ESSAY: 4,
  FANTASY_SF: 5,
  FUSION: 6,
  ACTION_MARTIAL_ARTS: 7,
  SPORTS_ACADEMY: 8,
  HORROR_DETECTIVE: 9,
} as const;

export type NovelRoomCategoryType =
  (typeof NovelRoomCategoryEnum)[keyof typeof NovelRoomCategoryEnum];

export const RoomCategoryDescription = {
  example: NovelRoomCategoryEnum.ACTION_MARTIAL_ARTS,
  description: `카테고리 =  일반소설 : ${NovelRoomCategoryEnum.NORMAL},
                          로맨틱/드라마 : ${NovelRoomCategoryEnum.ROMANCE_DRAMA},
                          코믹 : ${NovelRoomCategoryEnum.COMEDY},
                          시/에시이/수필 : ${NovelRoomCategoryEnum.POETRY_ESSAY},
                          판타지/SF : ${NovelRoomCategoryEnum.FANTASY_SF},
                          퓨전 : ${NovelRoomCategoryEnum.FUSION},
                          액션/무협 : ${NovelRoomCategoryEnum.ACTION_MARTIAL_ARTS},
                          스포츠/학원 : ${NovelRoomCategoryEnum.SPORTS_ACADEMY},
                          공포/추리 : ${NovelRoomCategoryEnum.HORROR_DETECTIVE}`,
};
