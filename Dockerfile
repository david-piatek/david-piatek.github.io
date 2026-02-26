FROM node:24.14.0-alpine3.23

RUN apk add --no-cache chromium=144.0.7559.132-r3

CMD ["npm", "run", "serve"]
