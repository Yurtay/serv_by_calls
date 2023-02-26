FROM node:latest

LABEL fly_launch_runtime="fly-test"

WORKDIR /app
COPY . .


EXPOSE 8080

RUN npm install

CMD ["npm", "start"]