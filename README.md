
# Overview
Project from https://codecrypto.academy/. 

The purpose of this project is to build a web application that accesses a Docker database (Postgres in this case) loaded with the Northwind database example.

The web application will have a main page with a list of all products. Each product will have a detail page that will allow the user to input a quantity to add those units to the shopping cart.

Finally, there will be a page for the entire shopping cart, where users can check the total amount and make a payment using the wallet installed in the browser (MetaMask in this case).

The payment will be conducted on a PoW test network that has been set up with Docker.
## Install Postgres Database with Docker
```
docker run --name ddbb-pg-cesta-eth -p 5432:5432 -e POSTGRES_PASSWORD=1234 -d postgres:13
```

## Initialize Genesis block
```
docker run --rm -it -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json ethereum/client-go:v1.11.5 init --datadir data /genesis.json
```
Notice that the image version of ethereum/client-go it's **v1.11.5**. That's a version in which will start the network with the PoW protocol.
## Start mining
```
docker run -d -p 8545:8545 --name eth-node-8888 -v ${PWD}/data:/data ethereum/client-go:v1.11.5 --datadir data --http --http.api persona,admin,eth,net,web3 --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 0xDDA7d3339972bFdc5D0074AEE17542Cf19d9406F --miner.threads 1 --http.corsdomain="*"
```

## Initialize react project with Vite
```
yarn create vite cesta-eth-front --template react
```