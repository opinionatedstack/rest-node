# rest-node


# Build Prod


# Build Dev
Build/push on development server
docker build -t opinionatedstack/rest-node:latest-dev -f Dockerfile.dev .
docker push parkinsoncare/pc-node:latest-dev

Combined:
docker build -t opinionatedstack/rest-node:latest-dev -f Dockerfile.dev . && docker push opinionatedstack/rest-node:latest-dev && say done
 --
Pull/run on dev server:
docker pull parkinsoncare/pc-node:latest-dev
docker run -it --rm --name pc-node-dev -p 172.31.39.89:3000:3000 parkinsoncare/pc-node:latest-dev
 
Combined:
docker pull parkinsoncare/pc-node:latest-dev && docker stop pc-node-dev && docker run -it --rm --name pc-node-dev -p 172.31.39.89:3000:3000 parkinsoncare/pc-node:latest-dev
 
 
docker build -t opinionatedstack/rest-node:latest -f Dockerfile.prod .
docker push opinionatedstack/rest-node:latest
docker build -t opinionatedstack/rest-node:latest -f Dockerfile.prod . && docker push opinionatedstack/rest-node:latest && say done

 docker run --name rest -it --rm -p 3000:3000 opinionatedstack/rest-node


# Testing
The web login application should have grant_type=password
