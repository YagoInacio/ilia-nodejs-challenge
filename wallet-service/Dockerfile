FROM node:lts-alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

RUN npm install --omit=dev

CMD ["npm", "run", "start:prod"]
