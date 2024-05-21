const SOCKET_EVENT = {
  ENTER_TEXT: 'enter/text',
  UPDATE_TEXT: 'update/text',
  CHANGE_WRITER_SEQUENCE: 'change/writer-sequence',
  EXIT_WRITER: 'exit/writer',
} as const;

type SOCKET_EVENT_TYPE = (typeof SOCKET_EVENT)[keyof typeof SOCKET_EVENT];

export { SOCKET_EVENT, SOCKET_EVENT_TYPE };
