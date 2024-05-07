FROM node:20-alpine as base

WORKDIR /app

FROM base as default
WORKDIR /app
COPY ["package.json", "./"]
COPY application_init.sh .
RUN chmod +x application_init.sh

FROM default as dev
WORKDIR /app
RUN npm install

# CI layer
FROM dev as ci
WORKDIR /app/
COPY . .

# Local layer
FROM base as local
WORKDIR /app/
COPY --from=ci /app/ .
COPY --from=dev /app/node_modules node_modules/
VOLUME .:app/src
EXPOSE 3030
CMD ["./application_init.sh"]