import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';

import { connectDB } from './config/db';
const app: Application = express();
connectDB();
app.use(cors());
app.use(express.json());
readdirSync('./routes').map((r) => app.use('/', require(`./routes/${r}`)));
app.get('/hello', (req: Request, res: Response) => {
  res.send('hello');
});
app.listen(process.env.PORT || 4000, () => {
  console.log('server us listinig', process.env.PORT);
});
