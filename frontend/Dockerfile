FROM node:carbon-jessie AS base

  WORKDIR /app
  COPY frontend/src/ ./
  EXPOSE 8080

FROM base AS dev

  RUN npm install -g @vue/cli
  RUN npm install
  CMD [ "npm", "run", "serve" ]

FROM base AS prod

# RUN nginx...
