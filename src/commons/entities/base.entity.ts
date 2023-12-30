// baseEntity 를 상속 받아야 하는 이유
// active Mapper을 사용하기 때문
// Active Record 패턴은 모델 자체 내에서 모든 쿼리 메서드를 정의하고 모델의 메서드를 통해 데이터를 조회, 삽입, 삭제
// Mapper 컨벤션으로는 Data-Mapper 패턴을 사용할거기 때문에 TypeORM에서 제공한 BaseEntity 를 사용하지 않고 따로 코드에서 정의
// 참조 링크 https://techbless.github.io/2020/03/15/TypeORM%EC%97%90%EC%84%9C-Active-Record-%ED%8C%A8%ED%84%B4%EC%9D%84-%EC%9C%84%ED%95%9C-BaseEntity-%EC%95%8C%EC%95%84%EB%B3%B4%EA%B8%B0/
// active Mapper
// export abstract class BaseEntity {}
