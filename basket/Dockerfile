FROM node:16-alpine AS base

  WORKDIR /app
  COPY basket/src/ ./
  EXPOSE 80

FROM base AS dev

  RUN npm install -g nodemon
  CMD [ "npm", "run", "watch" ]

FROM base AS prod

  CMD [ "npm", "start" ]
