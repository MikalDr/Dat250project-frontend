# Stage 1: Build the Angular app
FROM node:20.8.0-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

# Stage 2: Serve the app with nginx
FROM nginx:alpine as ngx
COPY --from=build /app/dist/frontend /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
