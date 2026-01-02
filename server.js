import express from 'express';
import http from 'http';
import compression from 'compression'
import morgan from 'morgan'
import { configDotenv } from 'dotenv'
import { pool, initDb } from './src/db/index.js'
import userRouter from './src/router/userRouter.js'
import noteRouter from './src/router/noteRouter.js'
import { requestLogger } from './src/middleware/requestLoggers.js';
import logsRouter from './src/router/logsRouter.js'
import healthRouter from './src/router/healthRouter.js'
const app = express();

app.use(compression());
app.use(express.json());  
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(requestLogger); 


const PORT = process.env.PORT

await initDb();

app.listen(PORT, ()=>{
    console.log(`Server running on localhost:${PORT}`)
})


app.use('/', userRouter)
app.use('/', noteRouter)
app.use('/', logsRouter)
app.use('/', healthRouter)