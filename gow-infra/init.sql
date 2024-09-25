--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 15.8 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: root
--

-- CREATE SCHEMA "public";


-- ALTER SCHEMA "public" OWNER TO postgres;

--
-- Name: chapter_status_enum; Type: TYPE; Schema: public; Owner: gowdb
--

CREATE ROLE gowdb WITH LOGIN PASSWORD 'wekgnwlekgnwlksdfLmFJ2U4aoQGkg';

GRANT ALL PRIVILEGES ON DATABASE "postgres" TO gowdb;

CREATE TYPE "public".chapter_status_enum AS ENUM (
    'writing',
    'review',
    'approve',
    'reject'
);


ALTER TYPE "public".chapter_status_enum OWNER TO gowdb;

--
-- Name: novel-room_category_enum; Type: TYPE; Schema: public; Owner: gowdb
--

CREATE TYPE "public"."novel-room_category_enum" AS ENUM (
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
);


ALTER TYPE "public"."novel-room_category_enum" OWNER TO gowdb;

--
-- Name: novel-room_status_enum; Type: TYPE; Schema: public; Owner: gowdb
--

CREATE TYPE "public"."novel-room_status_enum" AS ENUM (
    'prepare',  
    'series',
    'complete',
    'remove'
);


ALTER TYPE "public"."novel-room_status_enum" OWNER TO gowdb;

--
-- Name: novel-room_type_enum; Type: TYPE; Schema: public; Owner: gowdb
--

CREATE TYPE "public"."novel-room_type_enum" AS ENUM (
    '1',
    '2',
    '3',
    '4',
    '5'
);


ALTER TYPE "public"."novel-room_type_enum" OWNER TO gowdb;

--
-- Name: novel-text_status_enum; Type: TYPE; Schema: public; Owner: gowdb
--

CREATE TYPE "public"."novel-text_status_enum" AS ENUM (
    'temp',
    'complete'
);


ALTER TYPE "public"."novel-text_status_enum" OWNER TO gowdb;

--
-- Name: novel-writer_category_enum; Type: TYPE; Schema: public; Owner: gowdb
--

CREATE TYPE "public"."novel-writer_category_enum" AS ENUM (
    'host',
    'attendee'
);


ALTER TYPE "public"."novel-writer_category_enum" OWNER TO gowdb;

--
-- Name: novel-writer_status_enum; Type: TYPE; Schema: public; Owner: gowdb
--

CREATE TYPE "public"."novel-writer_status_enum" AS ENUM (
    'review',
    'attending',
    'reject',
    'exit'
);


ALTER TYPE "public"."novel-writer_status_enum" OWNER TO gowdb;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: board-like; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."board-like" (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    user_id integer,
    attend_board_id bigint
);


ALTER TABLE "public"."board-like" OWNER TO gowdb;

--
-- Name: COLUMN "board-like".created_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."board-like".created_at IS '생성시간 ';


--
-- Name: COLUMN "board-like".updated_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."board-like".updated_at IS '수정시간';


--
-- Name: board-like_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."board-like_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."board-like_id_seq" OWNER TO gowdb;

--
-- Name: board-like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."board-like_id_seq" OWNED BY "public"."board-like".id;


--
-- Name: chapter; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public".chapter (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    no integer NOT NULL,
    title character varying(255) NOT NULL,
    status "public".chapter_status_enum DEFAULT 'writing'::"public".chapter_status_enum NOT NULL,
    final_at timestamp without time zone,
    approval_at timestamp without time zone,
    view_count integer DEFAULT 0 NOT NULL,
    created_by_id integer,
    updated_by_id integer,
    novel_room_id bigint NOT NULL
);


ALTER TABLE "public".chapter OWNER TO gowdb;

--
-- Name: COLUMN chapter.created_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.created_at IS '생성시간 ';


--
-- Name: COLUMN chapter.updated_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.updated_at IS '수정시간';


--
-- Name: COLUMN chapter.no; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.no IS '소설공방의 회차 번호';


--
-- Name: COLUMN chapter.title; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.title IS '회차 제목';


--
-- Name: COLUMN chapter.status; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.status IS '회차 상태';


--
-- Name: COLUMN chapter.final_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.final_at IS '최종 작성일 ';


--
-- Name: COLUMN chapter.approval_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.approval_at IS '연재 승인일';


--
-- Name: COLUMN chapter.view_count; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public".chapter.view_count IS '조회수';


--
-- Name: chapter-comment; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."chapter-comment" (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    comment character varying(1000) NOT NULL,
    created_by_id integer,
    updated_by_id integer,
    _chapter_id bigint
);


ALTER TABLE "public"."chapter-comment" OWNER TO gowdb;

--
-- Name: COLUMN "chapter-comment".created_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."chapter-comment".created_at IS '생성시간 ';


--
-- Name: COLUMN "chapter-comment".updated_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."chapter-comment".updated_at IS '수정시간';


--
-- Name: chapter-comment_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."chapter-comment_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."chapter-comment_id_seq" OWNER TO gowdb;

--
-- Name: chapter-comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."chapter-comment_id_seq" OWNED BY "public"."chapter-comment".id;


--
-- Name: chapter-like; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."chapter-like" (
    id bigint NOT NULL,
    user_id integer,
    chapter_id bigint,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE "public"."chapter-like" OWNER TO gowdb;

--
-- Name: COLUMN "chapter-like".created_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."chapter-like".created_at IS '생성시간 ';


--
-- Name: COLUMN "chapter-like".updated_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."chapter-like".updated_at IS '수정시간';


--
-- Name: chapter-like_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."chapter-like_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."chapter-like_id_seq" OWNER TO gowdb;

--
-- Name: chapter-like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."chapter-like_id_seq" OWNED BY "public"."chapter-like".id;


--
-- Name: chapterLike_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."chapterLike_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."chapterLike_id_seq" OWNER TO gowdb;

--
-- Name: chapterLike_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."chapterLike_id_seq" OWNED BY "public"."chapter-like".id;


--
-- Name: chapter_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public".chapter_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public".chapter_id_seq OWNER TO gowdb;

--
-- Name: chapter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public".chapter_id_seq OWNED BY "public".chapter.id;


--
-- Name: chats_entity; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public".chats_entity (
    id integer NOT NULL
);


ALTER TABLE "public".chats_entity OWNER TO gowdb;

--
-- Name: chats_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public".chats_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public".chats_entity_id_seq OWNER TO gowdb;

--
-- Name: chats_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public".chats_entity_id_seq OWNED BY "public".chats_entity.id;


--
-- Name: message_entity; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public".message_entity (
    id integer NOT NULL,
    message character varying NOT NULL,
    chat_id integer,
    author_id integer
);


ALTER TABLE "public".message_entity OWNER TO gowdb;

--
-- Name: message_entity_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public".message_entity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public".message_entity_id_seq OWNER TO gowdb;

--
-- Name: message_entity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public".message_entity_id_seq OWNED BY "public".message_entity.id;


--
-- Name: novel-attend-board; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."novel-attend-board" (
    id bigint NOT NULL,
    title character varying(255) NOT NULL,
    content text NOT NULL,
    view_count integer DEFAULT 0,
    open_kakao_link character varying(4000) NOT NULL
);


ALTER TABLE "public"."novel-attend-board" OWNER TO gowdb;

--
-- Name: novel-room; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."novel-room" (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    type "public"."novel-room_type_enum" DEFAULT '1'::"public"."novel-room_type_enum" NOT NULL,
    title character varying(255) NOT NULL,
    sub_title character varying(255) NOT NULL,
    category "public"."novel-room_category_enum" DEFAULT '1'::"public"."novel-room_category_enum" NOT NULL,
    "character" character varying(255),
    summary character varying(255),
    completed_at timestamp without time zone,
    status "public"."novel-room_status_enum" DEFAULT 'prepare'::"public"."novel-room_status_enum" NOT NULL,
    user_id integer,
    book_cover character varying(1000)
);


ALTER TABLE "public"."novel-room" OWNER TO gowdb;

--
-- Name: COLUMN "novel-room".created_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-room".created_at IS '생성시간 ';


--
-- Name: COLUMN "novel-room".updated_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-room".updated_at IS '수정시간';


--
-- Name: COLUMN "novel-room".completed_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-room".completed_at IS '연재 완료일';


--
-- Name: novel-room_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."novel-room_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."novel-room_id_seq" OWNER TO gowdb;

--
-- Name: novel-room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."novel-room_id_seq" OWNED BY "public"."novel-room".id;


--
-- Name: novel-tag; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."novel-tag" (
    id bigint NOT NULL,
    novel_room_id bigint NOT NULL,
    tag_id bigint NOT NULL
);


ALTER TABLE "public"."novel-tag" OWNER TO gowdb;

--
-- Name: novel-tag_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."novel-tag_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."novel-tag_id_seq" OWNER TO gowdb;

--
-- Name: novel-tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."novel-tag_id_seq" OWNED BY "public"."novel-tag".id;


--
-- Name: novel-text; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."novel-text" (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    content text NOT NULL,
    chapter_id bigint NOT NULL,
    created_by_id integer,
    updated_by_id integer,
    status "public"."novel-text_status_enum" DEFAULT 'temp'::"public"."novel-text_status_enum" NOT NULL
);


ALTER TABLE "public"."novel-text" OWNER TO gowdb;

--
-- Name: COLUMN "novel-text".created_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-text".created_at IS '생성시간 ';


--
-- Name: COLUMN "novel-text".updated_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-text".updated_at IS '수정시간';


--
-- Name: novel-text_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."novel-text_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."novel-text_id_seq" OWNER TO gowdb;

--
-- Name: novel-text_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."novel-text_id_seq" OWNED BY "public"."novel-text".id;


--
-- Name: novel-writer; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."novel-writer" (
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    id bigint NOT NULL,
    category "public"."novel-writer_category_enum" DEFAULT 'host'::"public"."novel-writer_category_enum" NOT NULL,
    novel_room_id bigint NOT NULL,
    currently_writing boolean,
    writing_seq integer,
    notified_at timestamp without time zone,
    exited_at timestamp without time zone,
    user_id integer,
    status "public"."novel-writer_status_enum" DEFAULT 'review'::"public"."novel-writer_status_enum" NOT NULL
);


ALTER TABLE "public"."novel-writer" OWNER TO gowdb;

--
-- Name: COLUMN "novel-writer".created_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-writer".created_at IS '생성시간 ';


--
-- Name: COLUMN "novel-writer".updated_at; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-writer".updated_at IS '수정시간';


--
-- Name: COLUMN "novel-writer".currently_writing; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-writer".currently_writing IS '현재 작성 여부';


--
-- Name: COLUMN "novel-writer".writing_seq; Type: COMMENT; Schema: public; Owner: gowdb
--

COMMENT ON COLUMN "public"."novel-writer".writing_seq IS '현재 작성 여부';


--
-- Name: novel-writer_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public"."novel-writer_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."novel-writer_id_seq" OWNER TO gowdb;

--
-- Name: novel-writer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public"."novel-writer_id_seq" OWNED BY "public"."novel-writer".id;


--
-- Name: tag; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public".tag (
    id bigint NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE "public".tag OWNER TO gowdb;

--
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public".tag_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public".tag_id_seq OWNER TO gowdb;

--
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public".tag_id_seq OWNED BY "public".tag.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public"."user" (
    user_id integer NOT NULL,
    email character varying(255) NOT NULL,
    nickname character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    create_date timestamp without time zone DEFAULT now() NOT NULL,
    update_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE "public"."user" OWNER TO gowdb;

--
-- Name: user_chats_chats_entity; Type: TABLE; Schema: public; Owner: gowdb
--

CREATE TABLE "public".user_chats_chats_entity (
    user_user_id integer NOT NULL,
    chats_entity_id integer NOT NULL
);


ALTER TABLE "public".user_chats_chats_entity OWNER TO gowdb;

--
-- Name: user_user_id_seq; Type: SEQUENCE; Schema: public; Owner: gowdb
--

CREATE SEQUENCE "public".user_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public".user_user_id_seq OWNER TO gowdb;

--
-- Name: user_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gowdb
--

ALTER SEQUENCE "public".user_user_id_seq OWNED BY "public"."user".user_id;

--
-- Name: board-like id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."board-like" ALTER COLUMN id SET DEFAULT nextval('"public"."board-like_id_seq"'::regclass);


--
-- Name: chapter id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".chapter ALTER COLUMN id SET DEFAULT nextval('"public".chapter_id_seq'::regclass);


--
-- Name: chapter-comment id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-comment" ALTER COLUMN id SET DEFAULT nextval('"public"."chapter-comment_id_seq"'::regclass);


--
-- Name: chapter-like id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-like" ALTER COLUMN id SET DEFAULT nextval('"public"."chapter-like_id_seq"'::regclass);


--
-- Name: chats_entity id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".chats_entity ALTER COLUMN id SET DEFAULT nextval('"public".chats_entity_id_seq'::regclass);


--
-- Name: message_entity id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".message_entity ALTER COLUMN id SET DEFAULT nextval('"public".message_entity_id_seq'::regclass);


--
-- Name: novel-room id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-room" ALTER COLUMN id SET DEFAULT nextval('"public"."novel-room_id_seq"'::regclass);


--
-- Name: novel-tag id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-tag" ALTER COLUMN id SET DEFAULT nextval('"public"."novel-tag_id_seq"'::regclass);


--
-- Name: novel-text id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-text" ALTER COLUMN id SET DEFAULT nextval('"public"."novel-text_id_seq"'::regclass);


--
-- Name: novel-writer id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-writer" ALTER COLUMN id SET DEFAULT nextval('"public"."novel-writer_id_seq"'::regclass);


--
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".tag ALTER COLUMN id SET DEFAULT nextval('"public".tag_id_seq'::regclass);


--
-- Name: user user_id; Type: DEFAULT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."user" ALTER COLUMN user_id SET DEFAULT nextval('"public".user_user_id_seq'::regclass);



--
-- Data for Name: board-like; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."board-like" (created_at, updated_at, id, user_id, attend_board_id) FROM stdin;
2024-07-23 19:58:39.983273	2024-07-23 19:58:39.983273	10	17	38
2024-07-23 20:21:00.013842	2024-07-23 20:21:00.013842	11	17	39
2024-07-24 20:05:43.556107	2024-07-24 20:05:43.556107	12	18	39
\.


--
-- Data for Name: chapter; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public".chapter (created_at, updated_at, id, no, title, status, final_at, approval_at, view_count, created_by_id, updated_by_id, novel_room_id) FROM stdin;
2024-06-24 21:28:00	2024-06-24 21:28:00	56	1	2화 임시 회차	writing	2024-06-26 22:25:00	\N	0	1	1	38
2024-06-24 21:28:00	2024-06-24 21:28:00	57	1	2차 테스트 입니다.	writing	2024-07-21 22:34:09.396	\N	0	1	1	39
2024-08-15 17:33:00	2024-08-15 17:33:00	58	1	프롤로그	writing	2024-08-15 08:39:42.752	\N	0	19	19	40
\.


--
-- Data for Name: chapter-comment; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."chapter-comment" (created_at, updated_at, id, comment, created_by_id, updated_by_id, _chapter_id) FROM stdin;
\.


--
-- Data for Name: chapter-like; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."chapter-like" (id, user_id, chapter_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: chats_entity; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public".chats_entity (id) FROM stdin;
\.


--
-- Data for Name: message_entity; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public".message_entity (id, message, chat_id, author_id) FROM stdin;
\.


--
-- Data for Name: novel-attend-board; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."novel-attend-board" (id, title, content, view_count, open_kakao_link) FROM stdin;
40	12월 목표로 판타지 소설 작성해보실 분	제목은 '누가 내머리 위에 똥쌌어' 입니다.\n평일 저녁 8시 이후에 주로 작업하시는 분들 선호하고\n잠수 시 짤없이 강퇴합니다.\n\n궁금한점은 오픈챗 주세요	0	https://open.kakao.com/o/sJODAXff
39	제목22	모집내뇽22	9	링
38	글 제목	모집내용자리	19	맅ㅇ크
\.


--
-- Data for Name: novel-room; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."novel-room" (created_at, updated_at, id, type, title, sub_title, category, "character", summary, completed_at, status, user_id, book_cover) FROM stdin;
2024-06-24 21:28:22.59843	2024-06-24 21:28:22.59843	38	2	내가 만든	소개부분	1	\N	\N	\N	series	1	/images/book-cover-1.png
2024-06-24 21:28:52.598762	2024-06-24 21:28:52.598762	39	2	내가 만든 제목2	소개22	6	\N	\N	\N	series	1	/images/book-cover-1.png
2024-08-15 17:33:15.728365	2024-08-15 17:33:15.728365	40	5	추리소설 같이 써보실분?	추리소설 같이 써보실분 모집합니다	9	\N	\N	\N	series	19	/images/book-cover-1.png
\.


--
-- Data for Name: novel-tag; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."novel-tag" (id, novel_room_id, tag_id) FROM stdin;
36	40	16
39	40	15
38	40	13
37	40	14
\.


--
-- Data for Name: novel-text; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."novel-text" (created_at, updated_at, id, content, chapter_id, created_by_id, updated_by_id, status) FROM stdin;
2024-06-17 22:53:02.541716	2024-06-17 22:53:02.541716	376	d	48	6	6	temp
2024-06-17 22:53:15.08284	2024-06-17 22:53:15.08284	377	dd	48	6	6	temp
2024-06-17 22:53:21.710997	2024-06-17 22:53:21.710997	378	d	48	6	6	temp
2024-06-17 22:53:22.591445	2024-06-17 22:53:22.591445	379	d	48	6	6	temp
2024-06-17 22:53:23.041234	2024-06-17 22:53:23.041234	380	d	48	6	6	temp
2024-06-17 22:53:23.181922	2024-06-17 22:53:23.181922	381	d	48	6	6	temp
2024-06-17 22:53:23.541703	2024-06-17 22:53:23.541703	382	d	48	6	6	temp
2024-06-17 22:53:23.852496	2024-06-17 22:53:23.852496	383	d	48	6	6	temp
2024-06-17 22:53:24.181086	2024-06-17 22:53:24.181086	384	d	48	6	6	temp
2024-06-17 22:53:24.501053	2024-06-17 22:53:24.501053	385	d	48	6	6	temp
2024-06-17 22:53:24.791314	2024-06-17 22:53:24.791314	386	d	48	6	6	temp
2024-06-17 22:53:25.081607	2024-06-17 22:53:25.081607	387	d	48	6	6	temp
2024-06-17 22:53:25.381782	2024-06-17 22:53:25.381782	388	d	48	6	6	temp
2024-06-17 22:53:25.822195	2024-06-17 22:53:25.822195	389	d	48	6	6	temp
2024-06-17 22:53:32.751996	2024-06-17 22:53:32.751996	390	d	48	6	6	temp
2024-06-17 22:55:01.302182	2024-06-17 22:55:01.302182	391	d	48	6	6	temp
2024-06-17 22:58:44.033115	2024-06-17 22:58:44.033115	392	ㅇ	48	6	6	temp
2024-06-17 22:58:44.033143	2024-06-17 22:58:44.033143	393	ㅇㅇㅇ	48	6	6	temp
2024-06-17 22:58:51.711419	2024-06-17 22:58:51.711419	394	ㅇ	48	6	6	temp
2024-06-17 22:58:51.720833	2024-06-17 22:58:51.720833	395	ㅇㅇ	48	6	6	temp
2024-06-17 22:59:00.992976	2024-06-17 22:59:00.992976	396	ㅇ	48	6	6	temp
2024-06-17 22:59:00.992654	2024-06-17 22:59:00.992654	397	ㅇㅇ	48	6	6	temp
2024-06-17 23:01:11.27268	2024-06-17 23:01:11.27268	399	ㅇㅇ	48	6	6	temp
2024-06-17 23:01:11.273361	2024-06-17 23:01:11.273361	398	ㅇ	48	6	6	temp
2024-06-17 23:01:16.910657	2024-06-17 23:01:16.910657	400	ㅇㅇ	48	6	6	temp
2024-06-17 23:01:16.910348	2024-06-17 23:01:16.910348	401	ㅇ	48	6	6	temp
2024-06-17 23:02:03.191349	2024-06-17 23:02:03.191349	402	ㅇ	48	6	6	temp
2024-06-17 23:02:03.190924	2024-06-17 23:02:03.190924	403	ㅇㅇ	48	6	6	temp
2024-06-18 21:21:57.040581	2024-06-18 21:21:57.040581	404	ㅇ	49	6	6	temp
2024-06-18 21:21:57.0327	2024-06-18 21:21:57.0327	405	ㅇㅇ	49	6	6	temp
2024-06-18 21:23:28.640324	2024-06-18 21:23:28.640324	406	''	49	6	6	temp
2024-06-24 21:17:10.850656	2024-06-24 21:17:10.850656	449	11	48	1	1	temp
2024-06-24 21:17:19.280591	2024-06-24 21:17:19.280591	450	22	48	1	1	temp
2024-06-24 21:17:56.340965	2024-06-24 21:17:56.340965	451	22	48	1	1	temp
2024-06-18 21:36:00	2024-06-18 21:36:00	407	d	49	6	6	complete
2024-06-18 21:42:00	2024-06-18 21:42:00	408	dd	49	6	6	complete
2024-06-24 21:18:08.300187	2024-06-24 21:18:08.300187	452	33	48	1	1	temp
2024-06-24 21:19:19.431077	2024-06-24 21:19:19.431077	453	11	48	1	1	temp
2024-06-24 21:20:04.780662	2024-06-24 21:20:04.780662	454	dd	48	6	6	temp
2024-06-24 21:20:10.830237	2024-06-24 21:20:10.830237	455	22	48	6	6	temp
2024-06-18 21:42:00	2024-06-18 21:42:00	409	dd	49	6	6	complete
2024-06-19 13:22:40.600549	2024-06-19 13:22:40.600549	410	ㅇㅇ	49	6	6	temp
2024-06-19 13:22:44.908373	2024-06-19 13:22:44.908373	411	ㅇㅇ	49	6	6	temp
2024-06-19 13:22:00	2024-06-19 13:22:00	412	ㅇ	49	6	6	complete
2024-06-19 14:19:35.560195	2024-06-19 14:19:35.560195	413	dd	49	6	6	temp
2024-06-19 14:19:59.610096	2024-06-19 14:19:59.610096	414	dd	49	6	6	temp
2024-06-19 14:20:05.301109	2024-06-19 14:20:05.301109	415	dd	49	6	6	temp
2024-06-20 20:48:36.028466	2024-06-20 20:48:36.028466	416	dd	48	1	1	temp
2024-06-20 20:48:38.696402	2024-06-20 20:48:38.696402	417	d	48	1	1	temp
2024-06-20 20:48:39.575121	2024-06-20 20:48:39.575121	418	d	48	1	1	temp
2024-06-20 20:48:40.565747	2024-06-20 20:48:40.565747	419	d	48	1	1	temp
2024-06-20 20:48:41.216585	2024-06-20 20:48:41.216585	420	d	48	1	1	temp
2024-06-20 20:48:41.925784	2024-06-20 20:48:41.925784	421	d	48	1	1	temp
2024-06-20 20:48:42.695132	2024-06-20 20:48:42.695132	422	1	48	1	1	temp
2024-06-20 20:48:43.296385	2024-06-20 20:48:43.296385	423	1	48	1	1	temp
2024-06-20 20:48:43.896448	2024-06-20 20:48:43.896448	424	1	48	1	1	temp
2024-06-20 20:48:44.437904	2024-06-20 20:48:44.437904	425	1	48	1	1	temp
2024-06-20 20:48:45.016408	2024-06-20 20:48:45.016408	426	1	48	1	1	temp
2024-06-20 20:48:45.685006	2024-06-20 20:48:45.685006	427	1	48	1	1	temp
2024-06-20 20:48:47.016488	2024-06-20 20:48:47.016488	428	1	48	1	1	temp
2024-06-20 20:48:52.175694	2024-06-20 20:48:52.175694	429	1	48	1	1	temp
2024-06-23 18:23:57.197713	2024-06-23 18:23:57.197713	430	ddd	48	1	1	temp
2024-06-23 18:24:19.884898	2024-06-23 18:24:19.884898	431	dd	48	1	1	temp
2024-06-23 18:24:40.614134	2024-06-23 18:24:40.614134	432	;;	48	1	1	temp
2024-06-23 18:25:33.443065	2024-06-23 18:25:33.443065	433	dd	48	1	1	temp
2024-06-23 18:25:56.143508	2024-06-23 18:25:56.143508	434	dd	48	1	1	temp
2024-06-23 18:25:59.094086	2024-06-23 18:25:59.094086	435	ff	48	1	1	temp
2024-06-23 18:44:51.335279	2024-06-23 18:44:51.335279	436	fdgdfgsd	55	8	8	temp
2024-06-24 21:12:43.943936	2024-06-24 21:12:43.943936	437	ㅇㅇ	48	1	1	temp
2024-06-24 21:12:43.945465	2024-06-24 21:12:43.945465	438	ㅇ	48	1	1	temp
2024-06-24 21:12:59.040647	2024-06-24 21:12:59.040647	439	ㅇㅇ	48	1	1	temp
2024-06-24 21:12:59.050911	2024-06-24 21:12:59.050911	440	ㅇ	48	1	1	temp
2024-06-24 21:13:17.900482	2024-06-24 21:13:17.900482	441	22	48	1	1	temp
2024-06-24 21:14:47.340427	2024-06-24 21:14:47.340427	442	1	48	1	1	temp
2024-06-24 21:16:03.731882	2024-06-24 21:16:03.731882	443	11	48	1	1	temp
2024-06-24 21:16:25.930474	2024-06-24 21:16:25.930474	444	11	48	1	1	temp
2024-06-24 21:16:46.541813	2024-06-24 21:16:46.541813	445	11	48	1	1	temp
2024-06-24 21:16:48.920873	2024-06-24 21:16:48.920873	446	222	48	1	1	temp
2024-06-24 21:16:54.530629	2024-06-24 21:16:54.530629	447	11	48	1	1	temp
2024-06-24 21:17:01.102151	2024-06-24 21:17:01.102151	448	111	48	1	1	temp
2024-06-24 21:25:56.979206	2024-06-24 21:25:56.979206	456	11	54	1	1	temp
2024-06-24 21:26:04.529922	2024-06-24 21:26:04.529922	457	222	54	1	1	temp
2024-06-24 21:28:59.777435	2024-06-24 21:28:59.777435	458	11	56	1	1	temp
2024-06-24 21:29:04.137935	2024-06-24 21:29:04.137935	459	33	56	1	1	temp
2024-06-24 21:29:31.668301	2024-06-24 21:29:31.668301	460	22	56	1	1	temp
2024-06-24 21:30:04.977475	2024-06-24 21:30:04.977475	461	33	56	1	1	temp
2024-06-24 21:30:16.058119	2024-06-24 21:30:16.058119	462	22	56	1	1	temp
2024-06-24 21:33:32.466582	2024-06-24 21:33:32.466582	463	``	56	1	1	temp
2024-06-24 21:33:45.266725	2024-06-24 21:33:45.266725	464	22	56	1	1	temp
2024-06-24 21:37:42.595414	2024-06-24 21:37:42.595414	465	jj	56	1	1	temp
2024-06-24 21:37:47.774761	2024-06-24 21:37:47.774761	466	jj	56	1	1	temp
2024-06-24 21:39:57.387054	2024-06-24 21:39:57.387054	467	11	56	1	1	temp
2024-06-24 21:40:00.866753	2024-06-24 21:40:00.866753	468	33	56	1	1	temp
2024-06-24 21:40:41.943635	2024-06-24 21:40:41.943635	469	ㅇㅇ	56	1	1	temp
2024-06-24 21:43:57.118246	2024-06-24 21:43:57.118246	470	dd	56	1	1	temp
2024-06-24 21:58:13.181342	2024-06-24 21:58:13.181342	471	11	56	1	1	temp
2024-06-24 21:58:37.2802	2024-06-24 21:58:37.2802	472	11	56	1	1	temp
2024-06-24 21:58:51.44084	2024-06-24 21:58:51.44084	473	22	56	1	1	temp
2024-06-24 22:03:32.429809	2024-06-24 22:03:32.429809	474	11	56	1	1	temp
2024-06-24 22:04:55.92933	2024-06-24 22:04:55.92933	475	33	56	1	1	temp
2024-06-24 22:05:07.269816	2024-06-24 22:05:07.269816	476	11	56	1	1	temp
2024-06-24 22:06:49.048409	2024-06-24 22:06:49.048409	477	d	56	1	1	temp
2024-06-24 22:10:24.328144	2024-06-24 22:10:24.328144	478	11	57	1	1	temp
2024-06-24 22:10:28.456316	2024-06-24 22:10:28.456316	479	333	56	1	1	temp
2024-06-24 22:11:08.703218	2024-06-24 22:11:08.703218	480	22	57	1	1	temp
2024-06-24 22:11:13.082948	2024-06-24 22:11:13.082948	481	22	57	1	1	temp
2024-06-24 22:11:29.162519	2024-06-24 22:11:29.162519	482	22	56	1	1	temp
2024-06-24 22:11:35.061461	2024-06-24 22:11:35.061461	483	dd	57	1	1	temp
2024-06-24 22:11:50.060595	2024-06-24 22:11:50.060595	484	11	57	1	1	temp
2024-06-24 22:11:56.250279	2024-06-24 22:11:56.250279	485	333	56	1	1	temp
2024-06-24 22:12:15.729663	2024-06-24 22:12:15.729663	486	11	57	1	1	temp
2024-06-24 22:13:39.283697	2024-06-24 22:13:39.283697	487	dd	57	1	1	temp
2024-06-24 22:25:28.205005	2024-06-24 22:25:28.205005	488	11	57	1	1	temp
2024-06-24 22:25:31.504322	2024-06-24 22:25:31.504322	489	22	57	1	1	temp
2024-06-24 22:25:35.663663	2024-06-24 22:25:35.663663	490	22	57	1	1	temp
2024-06-24 22:25:53.633167	2024-06-24 22:25:53.633167	491	11	57	1	1	temp
2024-06-24 22:25:57.214679	2024-06-24 22:25:57.214679	492	22	57	1	1	temp
2024-06-24 22:32:41.713016	2024-06-24 22:32:41.713016	493	11	57	1	1	temp
2024-06-24 22:32:48.902061	2024-06-24 22:32:48.902061	494	1122	56	1	1	temp
2024-06-24 22:32:57.962259	2024-06-24 22:32:57.962259	495	11	57	1	1	temp
2024-06-24 22:33:01.97232	2024-06-24 22:33:01.97232	496	11	57	1	1	temp
2024-06-24 22:33:42.734413	2024-06-24 22:33:42.734413	497	44	57	1	1	temp
2024-06-24 22:33:49.321922	2024-06-24 22:33:49.321922	498	f	57	1	1	temp
2024-06-24 22:35:46.951396	2024-06-24 22:35:46.951396	499	11	57	1	1	temp
2024-06-24 22:36:14.452462	2024-06-24 22:36:14.452462	502	ss	57	1	1	temp
2024-06-24 22:36:19.864921	2024-06-24 22:36:19.864921	503	dd	56	1	1	temp
2024-06-24 22:36:22.211755	2024-06-24 22:36:22.211755	504	11	56	1	1	temp
2024-06-24 22:36:27.551315	2024-06-24 22:36:27.551315	505	22	56	1	1	temp
2024-06-26 22:25:47.149354	2024-06-26 22:25:47.149354	506	지금 10:25	56	1	1	temp
2024-06-26 22:27:27.10801	2024-06-26 22:27:27.10801	507	우	57	1	1	temp
2024-06-26 22:27:27.116059	2024-06-26 22:27:27.116059	508	나우	57	1	1	temp
2024-06-26 22:28:29.936801	2024-06-26 22:28:29.936801	509	111	57	1	1	temp
2024-06-24 22:35:00	2024-06-24 22:35:00	500	22	57	1	1	complete
2024-06-24 22:36:00	2024-06-24 22:36:00	501	33	57	1	1	complete
2024-06-27 21:21:58.001987	2024-06-27 21:21:58.001987	510	1\n	57	1	1	temp
2024-06-30 18:26:00	2024-06-30 18:26:00	513	adknfs	57	1	1	complete
2024-06-27 21:32:00	2024-06-27 21:32:00	512	1	57	1	1	complete
2024-06-27 21:22:00	2024-06-27 21:22:00	511	2	57	1	1	complete
2024-07-08 13:58:00	2024-07-08 13:58:00	519	주인공은 평범한 직장인으로, 어느 날 갑자기 사고를 당해 죽게 됩니다. 그러나 죽은 후에 눈을 떠보니, 그는 대기업의 재벌가 막내아들로 환생하게 됩니다. 이전 삶에서는 평범한 삶을 살았지만, 이번 생에서는 재벌가의 일원으로서 엄청난 부와 권력을 가지게 된 것입니다.\n주인공은 자신의 새로운 삶에 적응하며, 재벌가의 복잡한 가족 관계와 비즈니스 세계 속에서 생존해 나가기 위해 노력합니다. 그는 과거의 기억을 이용해 미래에 일어날 사건들을 예측하고, 이를 통해 자신의 입지를 강화하며 재벌가에서 살아남기 위한 전략을 세웁니다.	57	1	1	complete
2024-07-03 22:10:00	2024-07-03 22:10:00	518	안녕하세요.	57	1	1	complete
2024-07-21 14:10:00	2024-07-21 14:10:00	521	요	57	1	1	complete
2024-07-03 22:09:00	2024-07-03 22:09:00	515	안녕하세요	57	1	1	complete
2024-07-03 22:09:00	2024-07-03 22:09:00	516		57	1	1	complete
2024-07-03 22:10:00	2024-07-03 22:10:00	517	안녕하세요 테스트 중입니다.	57	1	1	complete
2024-07-21 14:10:00	2024-07-21 14:10:00	520	요요	57	1	1	complete
2024-07-21 22:34:00	2024-07-21 22:34:00	522	fgddfgdsfgs	57	1	1	complete
2024-08-15 17:39:42.687798	2024-08-15 17:39:42.687798	523	안녕하세요 저는 이용진 입니다.	58	19	19	temp
2024-07-03 22:09:00	2024-07-03 22:09:00	514	요	57	1	1	complete
\.


--
-- Data for Name: novel-writer; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."novel-writer" (created_at, updated_at, id, category, novel_room_id, currently_writing, writing_seq, notified_at, exited_at, user_id, status) FROM stdin;
2024-06-24 21:28:22.748888	2024-06-24 21:28:22.748888	62	host	38	t	1	\N	\N	1	attending
2024-07-21 22:08:00	2024-07-21 22:36:43.191923	66	attendee	39	t	2	2024-07-21 22:10:00	\N	17	attending
2024-06-24 21:28:00	2024-07-21 14:10:00	63	host	39	f	1	\N	\N	1	attending
2024-07-23 19:46:41.84378	2024-07-23 19:46:41.84378	67	attendee	38	f	\N	\N	\N	17	review
2024-07-24 20:39:47.420929	2024-07-24 20:39:47.420929	68	attendee	38	f	\N	\N	\N	18	review
2024-08-15 17:33:15.77794	2024-08-15 17:33:15.77794	69	host	40	t	1	\N	\N	19	attending
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public".tag (id, name) FROM stdin;
12	#아아
13	#코난
14	#공포
15	#추리
16	#추리
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public"."user" (user_id, email, nickname, password, create_date, update_date) FROM stdin;
1	test@test.com	nickname	$2b$10$HU.JaSETt8JH17VYmSVCN.aCGTH.h0bHfG6SXfm94QjWCPpLgvp9W	2024-03-04 22:56:24.442158	2024-03-04 22:56:24.442158
4	test1233@test.com	nickname12	$2b$10$zQaN/eloPnsYUYiZuPsZf.0tClChptUvcHHrGvpG8USZOXZKM1fIC	2024-05-15 16:08:10.791092	2024-05-15 16:08:10.791092
5	test3@test.com	nickname132	$2b$10$jf.hHeKpPsy.h9EWizTp.OLy2te3pWStw7EgOYmawE6g51Myh6ybO	2024-05-15 16:15:39.446094	2024-05-15 16:15:39.446094
6	rnfmaakt@gmail.com	잡만	$2b$10$/LwpssDfs/zpISErfL8diOV86WoIrsKD5RSk57W.wVQKkgsH.gF06	2024-05-15 19:05:33.775135	2024-05-15 19:05:33.775135
7	qqq1@test.com	qqq1	$2b$10$JwiLGhmuITRhANYSKm0h..LExyJ0Gotc/VNaJeUF3PWWf/uENLXwe	2024-05-17 10:53:10.267685	2024-05-17 10:53:10.267685
8	qqq2@test.com	qqq2	$2b$10$iHuDBXCj8u4BvhnSJAh2bOsewXDkdvu/EKQ0yf3GB9GbHApcMiXM.	2024-05-17 10:53:17.440017	2024-05-17 10:53:17.440017
9	qqq3@test.com	qqq3	$2b$10$SdxWwz4rTZBYMW1RSA3mOe.h4tNIksm71QXv0CRSekY7/Fy8ogF72	2024-05-17 10:53:22.170499	2024-05-17 10:53:22.170499
10	qqq4@test.com	qqq4	$2b$10$4Ajr.LXEWpIdfqYOv81Qj.K6SFQoCCKLEhvGlrZ1E/giG.96L7C1m	2024-05-17 10:53:26.654891	2024-05-17 10:53:26.654891
11	qqq5@test.com	qqq5	$2b$10$l.ijBx121Q2mAxxEGhwzdeQG2LYegJUx2o.A6/Qy9Py.KLi0QoHQ6	2024-05-17 10:53:30.616818	2024-05-17 10:53:30.616818
12	tb25271@gmail.com	nickname1234	$2b$10$fI/NNWFig2mBOyLR1QePkOGY0qWKkQTSCM2llaUrk9tjw5exC/uhu	2024-05-27 13:26:54.380119	2024-05-27 13:26:54.380119
13	qqq1@qqq.com	ttttt	$2b$10$iKisN8e7kNPakmLifJBs2eJ.PcDA8/xDqVGpI8VvLnuJ147zmj9om	2024-06-19 21:34:51.749569	2024-06-19 21:34:51.749569
14	12312@gmail.com	cafejun	$2b$10$MLG3w5hXL4McGytcqhTANOfVwZcG45CM7TRAQIHE6QtMhvtv9HH2u	2024-07-11 23:12:27.486926	2024-07-11 23:12:27.486926
15	test@gmail.com	ttt	$2b$10$BPEhRgi5V4PdgCdBKcVRqefZCUrRlaAgpSnsHEqV.S0tHXAQWfaYy	2024-07-16 19:49:25.000109	2024-07-16 19:49:25.000109
16	plankton11@naver.com	alal	$2b$10$m0b.SmY38WQ/w1RJheN5aOpp2bF1Orxcf8NhgY9KYuA1B7PHftYhu	2024-07-21 19:09:29.802207	2024-07-21 19:09:29.802207
17	aaa@gmail.com	testtt	$2b$10$mvwMFRP9fEuNIZiXUpjoXenJbHPlLVhB7BWcjEkEt/YKv187fPpyC	2024-07-21 21:58:32.812962	2024-07-21 21:58:32.812962
18	jsshin@gmail.com	gegsg	$2b$10$0RSouzX82EYli8hlpJYN2evFg8fUzXGub0MnQiQYtjPwTIXChQU6G	2024-07-24 20:04:39.638911	2024-07-24 20:04:39.638911
19	leeyjin726@naver.com	이용띠용	$2b$10$LaLQXCZdyikwadT.gr3N/uqFhCojKvU5g0o.hA0.l4tYEXlmZYH4W	2024-08-15 16:48:18.154814	2024-08-15 16:48:18.154814
\.


--
-- Data for Name: user_chats_chats_entity; Type: TABLE DATA; Schema: public; Owner: gowdb
--

COPY "public".user_chats_chats_entity (user_user_id, chats_entity_id) FROM stdin;
\.


-- Name: board-like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."board-like_id_seq"', 12, true);


--
-- Name: chapter-comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."chapter-comment_id_seq"', 1, false);


--
-- Name: chapter-like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."chapter-like_id_seq"', 1, false);


--
-- Name: chapterLike_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."chapterLike_id_seq"', 1, false);


--
-- Name: chapter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public".chapter_id_seq', 58, true);


--
-- Name: chats_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public".chats_entity_id_seq', 1, false);


--
-- Name: message_entity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public".message_entity_id_seq', 1, false);


--
-- Name: novel-room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."novel-room_id_seq"', 40, true);


--
-- Name: novel-tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."novel-tag_id_seq"', 39, true);


--
-- Name: novel-text_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."novel-text_id_seq"', 523, true);


--
-- Name: novel-writer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public"."novel-writer_id_seq"', 69, true);


--
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public".tag_id_seq', 16, true);


--
-- Name: user_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gowdb
--

SELECT pg_catalog.setval('"public".user_user_id_seq', 19, true);

--
-- Name: board-like PK_0ab6da1878293ddf67ba60bc4b3; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."board-like"
    ADD CONSTRAINT "PK_0ab6da1878293ddf67ba60bc4b3" PRIMARY KEY (id);


--
-- Name: chapter PK_275bd1c62bed7dff839680614ca; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".chapter
    ADD CONSTRAINT "PK_275bd1c62bed7dff839680614ca" PRIMARY KEY (id);


--
-- Name: user_chats_chats_entity PK_27be5e10486bddbd945b3a1ca96; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".user_chats_chats_entity
    ADD CONSTRAINT "PK_27be5e10486bddbd945b3a1ca96" PRIMARY KEY (user_user_id, chats_entity_id);


--
-- Name: message_entity PK_45bb3707fbb99a73e831fee41e0; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".message_entity
    ADD CONSTRAINT "PK_45bb3707fbb99a73e831fee41e0" PRIMARY KEY (id);


--
-- Name: novel-text PK_6ddf5b38b437d1685ec127e0b60; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-text"
    ADD CONSTRAINT "PK_6ddf5b38b437d1685ec127e0b60" PRIMARY KEY (id);


--
-- Name: user PK_758b8ce7c18b9d347461b30228d; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY (user_id);


--
-- Name: novel-attend-board PK_78829265fe2f600f425b40e7e68; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-attend-board"
    ADD CONSTRAINT "PK_78829265fe2f600f425b40e7e68" PRIMARY KEY (id);


--
-- Name: novel-tag PK_7a24c67182c3a0ae8d27fab8fb8; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-tag"
    ADD CONSTRAINT "PK_7a24c67182c3a0ae8d27fab8fb8" PRIMARY KEY (id);


--
-- Name: novel-writer PK_85a90a50c97b4fe2bff8e7b7e45; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-writer"
    ADD CONSTRAINT "PK_85a90a50c97b4fe2bff8e7b7e45" PRIMARY KEY (id);


--
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


--
-- Name: chapter-comment PK_93ef50699873f1b1398100ce441; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-comment"
    ADD CONSTRAINT "PK_93ef50699873f1b1398100ce441" PRIMARY KEY (id);


--
-- Name: chapter-like PK_98098b78e749cfa308c4051751f; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-like"
    ADD CONSTRAINT "PK_98098b78e749cfa308c4051751f" PRIMARY KEY (id);


--
-- Name: chats_entity PK_b48e44a2415426e809ad53f338f; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".chats_entity
    ADD CONSTRAINT "PK_b48e44a2415426e809ad53f338f" PRIMARY KEY (id);


--
-- Name: novel-room PK_c4c4372875dc927e676ed9c8164; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-room"
    ADD CONSTRAINT "PK_c4c4372875dc927e676ed9c8164" PRIMARY KEY (id);


--
-- Name: novel-room UQ_1eb55eea91b8d4e8d9c1adfc5d6; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-room"
    ADD CONSTRAINT "UQ_1eb55eea91b8d4e8d9c1adfc5d6" UNIQUE (title);


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: user UQ_e2364281027b926b879fa2fa1e0; Type: CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "UQ_e2364281027b926b879fa2fa1e0" UNIQUE (nickname);

--
-- Name: IDX_f41734a95a396f8912d5ccde2f; Type: INDEX; Schema: public; Owner: gowdb
--

CREATE INDEX "IDX_f41734a95a396f8912d5ccde2f" ON "public".user_chats_chats_entity USING btree (user_user_id);


--
-- Name: IDX_fa376b092bbbc737358302dfe9; Type: INDEX; Schema: public; Owner: gowdb
--

CREATE INDEX "IDX_fa376b092bbbc737358302dfe9" ON "public".user_chats_chats_entity USING btree (chats_entity_id);


--
-- Name: novel-tag FK_0210e4a5b4f6c31a73dd6bc63e7; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-tag"
    ADD CONSTRAINT "FK_0210e4a5b4f6c31a73dd6bc63e7" FOREIGN KEY (tag_id) REFERENCES "public".tag(id);


--
-- Name: chapter-like FK_0e3269d32d1cb6d69bb4bddc7b6; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-like"
    ADD CONSTRAINT "FK_0e3269d32d1cb6d69bb4bddc7b6" FOREIGN KEY (chapter_id) REFERENCES "public".chapter(id);


--
-- Name: message_entity FK_1b783a70cb56e92226ab19984e4; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".message_entity
    ADD CONSTRAINT "FK_1b783a70cb56e92226ab19984e4" FOREIGN KEY (chat_id) REFERENCES "public".chats_entity(id);


--
-- Name: novel-writer FK_2acda06c7c69de00c84451d7aa7; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-writer"
    ADD CONSTRAINT "FK_2acda06c7c69de00c84451d7aa7" FOREIGN KEY (user_id) REFERENCES "public"."user"(user_id);


--
-- Name: chapter FK_2b8d3a03a42e539a9cc4e25ff62; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".chapter
    ADD CONSTRAINT "FK_2b8d3a03a42e539a9cc4e25ff62" FOREIGN KEY (updated_by_id) REFERENCES "public"."user"(user_id);


--
-- Name: novel-text FK_3cfbd30c36f8f871c214c33c25d; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-text"
    ADD CONSTRAINT "FK_3cfbd30c36f8f871c214c33c25d" FOREIGN KEY (updated_by_id) REFERENCES "public"."user"(user_id);


--
-- Name: novel-room FK_4231c34de4b798fc5c14e37db64; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-room"
    ADD CONSTRAINT "FK_4231c34de4b798fc5c14e37db64" FOREIGN KEY (user_id) REFERENCES "public"."user"(user_id);


--
-- Name: novel-tag FK_61eaf05c67332bd100955c8595e; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-tag"
    ADD CONSTRAINT "FK_61eaf05c67332bd100955c8595e" FOREIGN KEY (novel_room_id) REFERENCES "public"."novel-room"(id);


--
-- Name: novel-text FK_6e58581645573f347bbb6a01db8; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-text"
    ADD CONSTRAINT "FK_6e58581645573f347bbb6a01db8" FOREIGN KEY (created_by_id) REFERENCES "public"."user"(user_id);


--
-- Name: novel-attend-board FK_78829265fe2f600f425b40e7e68; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-attend-board"
    ADD CONSTRAINT "FK_78829265fe2f600f425b40e7e68" FOREIGN KEY (id) REFERENCES "public"."novel-room"(id) ON DELETE CASCADE;


--
-- Name: novel-writer FK_7d75c3763131db0329475a281b1; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."novel-writer"
    ADD CONSTRAINT "FK_7d75c3763131db0329475a281b1" FOREIGN KEY (novel_room_id) REFERENCES "public"."novel-room"(id);


--
-- Name: chapter FK_8b46187447605f35d0fa4fbb708; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".chapter
    ADD CONSTRAINT "FK_8b46187447605f35d0fa4fbb708" FOREIGN KEY (novel_room_id) REFERENCES "public"."novel-room"(id);


--
-- Name: chapter FK_aa35e4886cfa8020d0634487784; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".chapter
    ADD CONSTRAINT "FK_aa35e4886cfa8020d0634487784" FOREIGN KEY (created_by_id) REFERENCES "public"."user"(user_id);


--
-- Name: chapter-comment FK_bb3ed1f936fa27012355817ba32; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-comment"
    ADD CONSTRAINT "FK_bb3ed1f936fa27012355817ba32" FOREIGN KEY (created_by_id) REFERENCES "public"."user"(user_id);


--
-- Name: chapter-comment FK_c450c4fd48db6272079fa541982; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-comment"
    ADD CONSTRAINT "FK_c450c4fd48db6272079fa541982" FOREIGN KEY (updated_by_id) REFERENCES "public"."user"(user_id);


--
-- Name: board-like FK_c9ec2140280dd9ad4bf3ea77123; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."board-like"
    ADD CONSTRAINT "FK_c9ec2140280dd9ad4bf3ea77123" FOREIGN KEY (user_id) REFERENCES "public"."user"(user_id);


--
-- Name: message_entity FK_cb865e968b8373506f193d57f71; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".message_entity
    ADD CONSTRAINT "FK_cb865e968b8373506f193d57f71" FOREIGN KEY (author_id) REFERENCES "public"."user"(user_id);


--
-- Name: board-like FK_d47dce007c5f9dd9d73537d7231; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."board-like"
    ADD CONSTRAINT "FK_d47dce007c5f9dd9d73537d7231" FOREIGN KEY (attend_board_id) REFERENCES "public"."novel-attend-board"(id);


--
-- Name: chapter-like FK_dc41a8882db3d0d5e2fd8e56afa; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-like"
    ADD CONSTRAINT "FK_dc41a8882db3d0d5e2fd8e56afa" FOREIGN KEY (user_id) REFERENCES "public"."user"(user_id);


--
-- Name: user_chats_chats_entity FK_f41734a95a396f8912d5ccde2f1; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".user_chats_chats_entity
    ADD CONSTRAINT "FK_f41734a95a396f8912d5ccde2f1" FOREIGN KEY (user_user_id) REFERENCES "public"."user"(user_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: user_chats_chats_entity FK_fa376b092bbbc737358302dfe92; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public".user_chats_chats_entity
    ADD CONSTRAINT "FK_fa376b092bbbc737358302dfe92" FOREIGN KEY (chats_entity_id) REFERENCES "public".chats_entity(id);


--
-- Name: chapter-comment FK_fd7378d132031e9adcc8120fb61; Type: FK CONSTRAINT; Schema: public; Owner: gowdb
--

ALTER TABLE ONLY "public"."chapter-comment"
    ADD CONSTRAINT "FK_fd7378d132031e9adcc8120fb61" FOREIGN KEY (_chapter_id) REFERENCES "public".chapter(id);

--
-- PostgreSQL database dump complete
--

