import express, { Application, Request, Response } from 'express';
import cors from 'cors';
const app: Application = express();
app.use(cors());
app.get('/hello', (req: Request, res: Response) => {
  res.send('hello');
});
app.listen(8000, () => {
  console.log('server us listinig');
});
