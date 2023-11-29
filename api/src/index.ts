import { getStartup, getStatusMapByUrl, getSingleMd} from './utils'

import express, { Express, Request, Response } from 'express';
import axios, { all } from 'axios'
import cors from 'cors'

const app: Express = express();
const port = 8080;

const APPRENTISSAGE_KEYWORD = 'mission-apprentissage';
app.use(cors())
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

app.get('/missions', async (req: Request, res: Response) => {

  const startups = await getStartup();
  const filteredData = startups.filter(({ relationships }: { relationships: any }) => relationships.incubator.data.id === APPRENTISSAGE_KEYWORD)
  const dataFormatted = await getStatusMapByUrl()
  const finalData = filteredData.map(({ id, attributes }: any) => {
    if (!attributes.link) {
      return {
        name: attributes.name,
        id,
        status: '-'
      }
    }
    const url = new URL(attributes.link)

    return {
      name: attributes.name,
      id,
      status: dataFormatted[url.hostname] ?? '-'
    }
  })

    
    
  
 
  res.send(finalData);  
})

// Warning
// This api is far from being optimised
// It has to first fetch all startups to find the url of the suitable one
app.get('/missions/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const stringedMd = await getSingleMd(id)
    const startups = await getStartup();
    const filteredData = startups.find((data : { id: string}) => data.id === id )

    if (!filteredData?.attributes?.link) {
      res.send({md: stringedMd, status: '-' })
      return 
    }
    const url = new URL(filteredData.attributes.link)
    const statusMap = await getStatusMapByUrl()

    res.send({md: stringedMd, status: statusMap[url.hostname] ?? '--' }) 
    
  } catch(e) {
    console.log(e)
    res.send(400)
  }
  
})