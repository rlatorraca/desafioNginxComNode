FROM node:17

WORKDIR /usr/src/app/

# Install bash
RUN apt-get update && apt-get install -y bash apt-utils vim wget

COPY package*.json ./

COPY index.* ./ 

COPY ./views ./views

RUN npm ci --production

# Install dependencies
RUN npm install

RUN npm install mysql --save

RUN npm install ejs

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

EXPOSE 3000

#CMD [ "node", "index.js" ]




