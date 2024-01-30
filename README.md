# Restful URL 규칙 정의

## 1. url은 명사 중심으로 표현

    POST : /novel-room/create-room (X)
    POST : /novel-room (O)

## 2. CRUD 는 HTTP method 표현

    GET    : /novel-room -> Get All room
    POST   : /novel-room -> Create new room
    GET    : /novel-room -> Get room for given id
    PUT    : /novel-room -> Update room for given id
    DELETE : /novel-room -> Delete room for given id

## 3. /(slash)로 계층을 구분

    GET    : /novel-room/seq
    GET    : /novel-room/writer
    GET    : /novel-room/writer/{id}

## 4. (\_)underbar 와 대문자 대신 (-)hyphens 및 소문자를 사용

    /novel-Room (X)
    /novel_room (X)
    /novel-room (0)

참조 : https://restfulapi.net/resource-naming/

# Restful 요청 응답 데이터 규칙 정의

## 1. 쿼리 Param,Body 요청 및 응답 데이터는 camelCase 를 사용한다

    {
        novelRoom: "test",
        currnetWriter: "name"
    }

# Repository Layer 추상화

## 1. Repository Layer는 인터페이스로 분리하고 [도메인]Repository명으로 한다

```ts
export interface ChapterRepository {
  saveRow(entity: Partial<ChapterEntity>): Promise<void>;
  updateRow(id: number, entity: Partial<ChapterEntity>): Promise<void>;
  deleteRow(id: number): Promise<void>;
  findByoptions(
    options: FindOneOptions<ChapterEntity>,
  ): Promise<ChapterEntity[]>;
  findChpaterByRoomIdAndCount(
    novelRoomId: number,
    pagination: BasePaginationRequest,
  ): Promise<[ChapterEntity[], number]>;
  findOneByOptions(
    options: FindOneOptions<ChapterEntity>,
  ): Promise<ChapterEntity>;
  chapterCount(noveRoomId: number): Promise<number>;
}
```

## 2. DI 할 Token 과 Module provide에 적용할 RepositoryProvdier 같이 정의한다

```ts
export const ChapterRepositoryToken = 'ChapterRepository';

export const ChapterRepositoryProvider: Provider = {
  provide: ChapterRepositoryToken,
  useClass: ChapterRepositoryImpl,
};
```

## 3. Repository 구현 파일은 [도메인]RepositoryImpl 클래스로 정의한다

```ts
    export class ChapterRepositoryImpl {
        ......
    }
```
