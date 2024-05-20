const SOCKET_EVENT = {
  ENTER_TEXT: 'enter/text',
  UPDATE_TEXT: 'update/text',
  UPDATE_WRITER_SEQUENCE: 'update/writer-sequence',
  EXIT_WRITER: 'exit/writer',
} as const;

type SOCKET_EVENT_TYPE = (typeof SOCKET_EVENT)[keyof typeof SOCKET_EVENT];

export { SOCKET_EVENT, SOCKET_EVENT_TYPE };
