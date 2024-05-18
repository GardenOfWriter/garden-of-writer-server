export const NovelRoomAttendQueryEnum = {
  ATTENDING: 'attending',
  ATTEND_APPLY: 'apptendApply',
} as const;

export type NovelRoomAttendQueryType = (typeof NovelRoomAttendQueryEnum)[keyof typeof NovelRoomAttendQueryEnum];

export const DescriptionProperty = {
  enum: NovelRoomAttendQueryEnum,
  example: NovelRoomAttendQueryEnum.ATTENDING,
  description: `  ${NovelRoomAttendQueryEnum.ATTENDING} : 참여,
                    ${NovelRoomAttendQueryEnum.ATTEND_APPLY} : 참여신청`,
} as const;
