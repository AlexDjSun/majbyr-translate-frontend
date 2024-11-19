FROM node:alpine AS builder

RUN adduser -D -g '' www
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM bitnami/nginx:latest
COPY --from=builder /app/build /app
COPY default.conf /opt/bitnami/nginx/conf/server_blocks/
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]