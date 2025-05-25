FROM nginx:1.28.0

RUN rm -rf /usr/share/nginx/html

COPY static /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf