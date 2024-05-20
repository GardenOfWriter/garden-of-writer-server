import { HttpStatus } from '@nestjs/common';
import { NovelRoomErrorMessage } from './message/novel-room.message';
import { BaseException } from '@app/commons/exception/base.exception';

/**
 * 소설 공방 중복 제목 예외
 * @export
 * @class NovelRoomDuplicationSubTitleException
 * @typedef {NovelRoomDuplicationSubTitleException}
 * @extends {BaseException}
 */
export class NovelRoomDuplicationSubTitleException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.DUPLICATION_TITLE, HttpStatus.CONFLICT);
  }
}

/**
 * 소설 공방을 찾을수 없는 예외
 *
 * @export
 * @class NovelRoomNotFoundException
 * @typedef {NovelRoomNotFoundException}
 * @extends {BaseException}
 */
export class NovelRoomNotFoundException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.NOT_FOUND_NOVEL_ROOM, HttpStatus.NOT_FOUND);
  }
}

/**
 * 소설 공방 중복 제목 예외
 * @export
 * @class NovelRoomDuplicationTitleException
 * @typedef {NovelRoomDuplicationTitleException}
 * @extends {BaseException}
 */
export class NovelRoomDuplicationTitleException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.DUPLICATION_TITLE, HttpStatus.CONFLICT);
  }
}

/**
 * 이미 완료된 소설 공방 예외
 *
 * @export
 * @class NovelRoomAlreadyComplatedException
 * @typedef {NovelRoomAlreadyComplatedException}
 * @extends {BaseException}
 */
export class NovelRoomAlreadyComplatedException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.ALREADY_COMPLETED, HttpStatus.CONFLICT);
  }
}
/**
 *  소설 공방 접근 권한 없음 (작가 상태 참여중이 아닌 경우)
 *
 * @export
 * @class NovelRoomAlreadyComplatedException
 * @typedef {NovelRoomAlreadyComplatedException}
 * @extends {BaseException}
 */
export class NovelRoomAccessDeniedException extends BaseException {
  constructor() {
    super(NovelRoomErrorMessage.ACCESS_DENIED, HttpStatus.FORBIDDEN);
  }
}
