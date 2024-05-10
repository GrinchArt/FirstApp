
FROM node:16 AS build
WORKDIR /app
COPY ["Angular part/package.json", "Angular part/package-lock.json", "./"]
RUN npm install
COPY ["Angular part/", "./"]
RUN npm run build --output-path=./dist/out


FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/dist/out .
COPY ["Angular part/nginx.conf", "/etc/nginx/nginx.conf"]
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
