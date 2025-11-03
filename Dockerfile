# 1. 베이스 이미지 설정
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. package.json 및 package-lock.json 복사
COPY package*.json ./

# 4. 의존성 설치
RUN npm install

# 5. 모든 소스 코드 복사
COPY . .

# 6. 애플리케이션 빌드
RUN npm run build

# 7. 실행 포트 설정
EXPOSE 3001

# 8. 애플리케이션 실행
CMD ["npm", "run", "start:dev"]
