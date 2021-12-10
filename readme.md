Docker allows you to package an application with its environment and all of its dependencies into a "box", called a container. Usually, a container consists of an application running in a stripped-to-basics version of a Linux operating system. An image is the blueprint for a container, a container is a running instance of an image.

-- First we will create a basic node app. Most probably with only express and nodemon to serve single URL i.e "/"

-- Now we will add docker file with name "Dockerfile"

In Dockerfile we will add some information related to:
a. FROM : this works like inheritance i.e from where we will need other dependencies
b. WORKDIR : we create a directory to hold the application code inside the image, this will be the working directory
    for your application :which directory we need to set as home (in linux kernel)
c. COPY source dest : which file we need to copy
d. RUN : which command we run
e. CMD [ "", "" ] : list of commands in string we need to run as docker container is started

NOTE: In Dockerfile we have copied package.json file first and then all file because of working of Docker. As Docker
    always caches all the responses for better completion of process.

-- Now we need to build the image

to build the docker image : docker build path (path is of all files which we need to send to docker daemon. for
    local we can use . i.e docker build . )

to name the docker image:
docker build -t node-docker-first . [-t flag for naming image]

we can list out all docker images through:
docker image ls

to remove image:
docker image rm [image ID]

-- Now we need to run the container

docker run -it -p 9000:3000 node-docker-first  [interactive mode]
docker run -d -p 9000:3000 node-docker-first  [detached mode]

** container created with either of the above commands will have any name, but if we need to set the name then

docker run -d -p 9000:3000 --name node-app node-docker-first

if we need to remove the container

docker rm container-id -f

-- if we need to access file-system of docker (linux kernel through bash) then

docker exec -it node-docker-first bash

-- to restart node daemon on changes, we need to use volume like

docker run -v ${pwd}:/app -p 9000:3000 -it node-app

with "nodemon -L index.js" as script, where -L is for legacy watch