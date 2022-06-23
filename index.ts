import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import passwords from './routes/passwords';
import category from './routes/category';
import user from './routes/user';

dotenv.config();

const app:Application = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req:Request, res:Response) => {
    res.send('Hello you"');
});

app.use('/api/v1', passwords);
app.use('/api/v1', category);
app.use('/api/v1', user);

app.use((req:Request, res:Response) => {
    res.status(404);
});

const port = process.env.PORT;

app.listen(port, () => console.log(`The server is running on the port ${port}`));