import express from 'express';
import cors from 'cors';
import routes from './routers';
import connection from './config/database';

const server = express();

server.use(express.json());
server.use(cors());

server.use(routes);

const port = 3000;

connection.then(() => {
    console.log('db connected...')
    server.listen(port, () => {
        console.log("Server started on port: ", port)
    });
}).catch((err) => console.log(err));
