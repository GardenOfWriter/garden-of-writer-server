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

export type NovelRoomCategory =
  (typeof NovelRoomCategoryEnum)[keyof typeof NovelRoomCategoryEnum];
