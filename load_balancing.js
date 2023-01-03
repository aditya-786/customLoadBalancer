const express = require('express')
const app = express()
const axios = require('axios');
const SERVERS = require('./config');
const bodyParser = require('body-parser')
const ConsistentHashing = require('./ConsistentHashing');
const loadBalancer = new ConsistentHashing(["3000", "3001", "3002", "3003", "3004"], 10, 'md5', 1500);

const PROXY_PORT = 80;

const nodes = {};

const handleRequest = async (req, res) => {

    try {
        const { url, originalUrl, method, headers, body: data } = req;
        //get address where need to go/save
        const { reqId } = req.query;
        const node = loadBalancer.getNode(reqId);

        if (nodes[node]) {
            nodes[node].push(originalUrl);
        } else {
            nodes[node] = [];
            nodes[node].push(originalUrl);
        }
        console.log(nodes)

        const response = await axios({ url: SERVERS[node] + originalUrl.substring(1), headers, method, data });
        res.send(response.data);
    }
    catch (error) {
    }
}
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(express.json());
app.use((req, res) => { handleRequest(req, res) })

app.listen(PROXY_PORT, () => console.log(`Listening on proxy server port : ${PROXY_PORT}`));