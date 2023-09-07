FROM node:18-alpine

WORKDIR /usr/src/pni

RUN yarn add next

COPY yarn.lock .
COPY package.json .

RUN yarn install

COPY . .
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["yarn", "start"]
