# base node image
FROM node:12
ARG APP_ENV=development

WORKDIR /usr/src/app

COPY . ./

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV production
ENV APP_ENV ${APP_ENV}

CMD [ "npm", "run", "start" ]
