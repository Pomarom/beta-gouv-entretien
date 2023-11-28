import express, { Express, Request, Response } from 'express';
import axios from 'axios'
import cors from 'cors'

const app: Express = express();
const port = 8080;

app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/missions', async (req: Request, res: Response) => {
  // First get only the statusrepponse and deduce the apprentissage mission only
  // const startups = await axios.get('https://api.github.com/repos/betagouv/beta.gouv.fr/contents/content/_startups')
  const statusResponse = await axios.get('https://api.github.com/repos/mission-apprentissage/upptime/contents/history/summary.json')

  const jsonStatusb64 = statusResponse.data.content
  const decodedB64 = Buffer.from(jsonStatusb64, "base64");
  const jsonData = JSON.parse(decodedB64.toString());
  const dataFormatted = jsonData.map(( { status, name, slug } : any) => ( { status, name, id: slug }))
  res.send(dataFormatted);  
})