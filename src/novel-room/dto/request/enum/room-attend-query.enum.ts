export const NovelRoomAttendQueryEnum = {
  ATTENDING: 'attending',
  NON_ATTENDING: 'non_attending',
} as const;

export type NovelRoomAttendQueryType =
  (typeof NovelRoomAttendQueryEnum)[keyof typeof NovelRoomAttendQueryEnum];

export const DescriptionProperty = {
  ROOM_STATUS: {
    enum: NovelRoomAttendQueryEnum,
    example: NovelRoomAttendQueryEnum.ATTENDING,
    description: `  ${NovelRoomAttendQueryEnum.ATTENDING} : 참여,
                    ${NovelRoomAttendQueryEnum.NON_ATTENDING} : 미참여`,
  },
} as const;
