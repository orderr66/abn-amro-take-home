# ABN AMRO Take Home


Visualization of hierarchical data. It has features like add node, delete node and animate.

### Installation

Install [Docker](https://docs.docker.com/engine/install/) for your preferred operating system. 

```bash
#clone repo
https://github.com/orderr66/abn-amro-take-home.git

#go to repository
cd abn-amro-take-home

#run
docker compose up
```
Docker will pull the latest available images and run the project. It can take several minutes.

### Available Endpoints
```bash
#server
http://localhost:4000/

#neo4j client
http://localhost:7474/browser/

#client
http://localhost:8080/
```
### Migration
You should migrate graph data before using the application. Enter into server image via docker desktop CLI or with using a command in terminal
```bash
#list containers and copy server:latest image
docker ps
docker exec -it <container id> sh

#run 
npm run migrate-prod

#for clearing node
npm run clear-nodes-prod
```
After successful migration(`Migration process successfully finished!`), you can use the web app. If data already exists you will get `Data already migrated please check Neo4j DB!` message.

## Developmnet

```bash
#run Neo4j in docker
docker run \
    --name testneo4j \
    -p7474:7474 -p7687:7687 \
    -d \
    -v $HOME/neo4j/data:/data \
    -v $HOME/neo4j/logs:/logs \
    -v $HOME/neo4j/import:/var/lib/neo4j/import \
    -v $HOME/neo4j/plugins:/plugins \
    --env NEO4J_AUTH=neo4j/test \
    neo4j:latest
    
cd server
npm install
#migrate data
npm run migrate
#clear nodes
npm run clear-nodes
# you can run tests
npm run test

cd client 
npm install
npm run serve
```

## Application
[![app.png](https://i.postimg.cc/9M7ZxYYC/app.png)](https://postimg.cc/47XYyt0S)

You can add a new node by entering node name, parent node, and description. If you click one of the nodes. Popup will appear

[![Screen-Shot-2021-12-16-at-16-49-48.png](https://i.postimg.cc/Vvrc35Hq/Screen-Shot-2021-12-16-at-16-49-48.png)](https://postimg.cc/n9J5mVxr)

You can close popup or delete node. Currently only child nodes can be deleted. You can't delete root node or any node with children! There was no logic how to balance tree after deleting. Deleting all childs was an option but I didn't implement it :)

## Animation
If Animation checkbox is checked popups will not appear while clicking on nodes. You can animate tree by clicking parent nodes.

## Neo4j
You can view Nodes in neo4j client and query data. There is CHILD relationship between nodes.

[![Screen-Shot-2021-12-16-at-16-59-42.png](https://i.postimg.cc/fbCtbgWH/Screen-Shot-2021-12-16-at-16-59-42.png)](https://postimg.cc/HJJsZzy5)


## CI/CD

When branch merged in master github action triggers ci. Github action builds docker images for client and server add deploys to docker hub. Azure puls new images from docker hub and deploys into webapp. 

## Tech Stack: Nodejs, Vuejs, Neo4j, Javascript, Typescript, ExpressJS, Mocha, Chai, Github Actions, Docker, Docker Compose, Docker Hub, Azure.

## Production

Currently web app is live in `https://abnamrotakehome.azurewebsites.net/`. There is a problem about migration data to neo4j db. I couldn't manage to connect the web app via ssh to run scripts because ssh is not supported in custom images. There are solutions for single container applications but I couldn't manage to solve this problem in multi-container applications. Probably I will try to change the migration logic after your review process will end.

### Thank you! Please feel free to ask me any questions you have regarding the assignment

## License
[MIT](https://choosealicense.com/licenses/mit/)
