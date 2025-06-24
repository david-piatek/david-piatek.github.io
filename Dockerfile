FROM node:24.2.0-alpine3.21

RUN apk add chromium

CMD ["npm", "run", "serve"]