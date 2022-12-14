FROM nginx:1.17-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./build/ /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]