/**
 * 작가 구분 enum
 *
 * @type {{ readonly HOST: "host"; readonly ATTENDEE: "attendee"; }}
 */
export const WriterCategoryEnum = {
  HOST: 'host', // 대표 착가
  ATTENDEE: 'attendee', // 참여 작가
} as const;

export type WriterCategoryType = (typeof WriterCategoryEnum)[keyof typeof WriterCategoryEnum];

export const WriterCategoryDescription = {
  enum: WriterCategoryEnum,
  example: WriterCategoryEnum.HOST,
  description: `${WriterCategoryEnum.HOST} : 대표 작가, 
                ${WriterCategoryEnum.ATTENDEE} : 참여 작가`,
};
