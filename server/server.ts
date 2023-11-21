import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { readdirSync } from 'fs';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import fileUpload from "express-fileupload"
import { connectDB, swaggerJsDocOptions } from './config';


const specs = swaggerJsDoc(swaggerJsDocOptions);
const app: Application = express();
connectDB();
app.use(cors());
app.use(fileUpload({
  useTempFiles: true
}))
app.use(express.json());
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)));
app.get('/hello', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(process.env.PORT || 4000, () => {
  console.log('server us listinig', process.env.PORT);
});
app.use('/api', swaggerUI.serve, swaggerUI.setup(specs));
