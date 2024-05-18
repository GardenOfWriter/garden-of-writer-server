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

export type NovelRoomCategoryType = (typeof NovelRoomCategoryEnum)[keyof typeof NovelRoomCategoryEnum];

export const findCategoryName = (category: number) => {
  switch (category) {
    case 1:
      return '일반소설';
    case 2:
      return '로맨틱/드라마';
    case 3:
      return '코믹';
    case 4:
      return '시/에시이/수필';
    case 5:
      return '판타지/SF';
    case 6:
      return '퓨전';
    case 7:
      return '액션/무협';
    case 8:
      return '스포츠/학원';
    case 9:
      return '공포/추리';
  }
};

export const RoomCategoryDescription = {
  example: {
    id: NovelRoomCategoryEnum.NORMAL,
    name: findCategoryName(NovelRoomCategoryEnum.NORMAL),
  },
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
