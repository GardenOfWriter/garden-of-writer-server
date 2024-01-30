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
