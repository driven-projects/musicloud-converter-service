FROM node:16.14.0

RUN apt update
RUN apt install -y ffmpeg

WORKDIR /app

COPY . .
RUN npm i
RUN npm run build

CMD ["npm", "start"]
