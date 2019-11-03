# Use latest node version 10.x
FROM node:10-slim

# create app directory in container
RUN mkdir -p /app/

# set /app directory as default working directory
WORKDIR /app

# copy all file from current dir to /app in container
COPY . /app/

# expose port 10000
EXPOSE 10000

# cmd to start service
CMD [ "npm", "run", "startup" ]
