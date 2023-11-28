import { getStatus } from './utils'

import express, { Express, Request, Response } from 'express';
import axios from 'axios'
import cors from 'cors'

const app: Express = express();
const port = 8080;

const APPRENTISSAGE_KEYWORD = 'apprentissage';
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/missions', async (req: Request, res: Response) => {

  // Filter data to get only apprentisssage data ( not optimised )
  //const startups = await axios.get('https://api.github.com/repos/betagouv/beta.gouv.fr/contents/content/_startups')
  //const startupsResponse = startups.data;
  // const filteredData = startupsResponse.filter(({ name }: { name: string }) => name.includes(APPRENTISSAGE_KEYWORD))
  
  const dataFormatted = await getStatus()
 
  res.send(dataFormatted);  
})

app.get('/missions/:id', async (req: Request, res: Response) => {
  // Use getSingleMd in utils
  res.send('ok')
})