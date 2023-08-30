# Instalar BBDD Postgres
docker run --name ddbb-pg-cesta-eth -p 5432:5432 -e POSTGRES_PASSWORD=1234 -d postgres:13



# Comando para inicializar el bloque genesis
docker run --rm -it -v ${PWD}/data:/data -v ${PWD}/genesis.json:/genesis.json ethereum/client-go:v1.11.5 init --datadir data /genesis.json

# Comando para lanzar el nodo
docker run -d -p 8545:8545 --name eth-node-8888 -v ${PWD}/data:/data ethereum/client-go:v1.11.5 --datadir data --http --http.api persona,admin,eth,net,web3 --http.addr 0.0.0.0 --http.port 8545 --mine --miner.etherbase 0xDDA7d3339972bFdc5D0074AEE17542Cf19d9406F --miner.threads 1 --http.corsdomain="*"

# Comando para crear plantilla del front
yarn create vite cesta-eth-front --template react