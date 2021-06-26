FROM node:alpine

WORKDIR /backend
RUN npm install -g @nestjs/cli
COPY package.json yarn.lock ./
RUN yarn
COPY . ./

CMD ["npm", "run", "start:dev"]