#Get our base image
FROM node:16.14.0-alpine
#Set our Working Directory :: Not necessary but recommended 
WORKDIR /app
#copy our package.json to our working directory
COPY package.json .

#Install our dependancies
#NODE_ENV is a passed arg from our docker compose prod and dev files
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
#if development run full npm install 
    then npm install; \ 
#if prod install only prod dependancies
#Since we want to always rebuild our app due to typescript we can ignore this
    else npm install; \
    fi

# Copy now the rest of our files
COPY . ./
# Build our app
RUN npm run build
#Which port our app will expose
EXPOSE 80
#Commands to setup bash to make it easy to interact with our app since we using an alpine image
RUN apk add --no-cache bash
#Command to run to start the container in production mode
CMD ["npm", "start"]
#Command to run to start the container in dev mode
#CMD ["npm", "run", "devdocker"]

#Command Summary to run on windows
# Run in detached mode -d
# name of container --name nodets
# Map external port 3000 to container port 80 -p 3000:80
# Bind our volume for dev purposes with readonly ro -v ${pwd}:/app:ro
# Prevent binding our node_modules folder -v /app/node_modules

# docker run -d --name nodets -p 3000:80 -v ${pwd}:/app:ro -v /app/node_modules nodets

#Building image
# docker build . -t nodets --network=host
# --network=host use dns from host, for me it's worked.