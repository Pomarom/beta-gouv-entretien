import axios from 'axios'

export const getStatus = async () => {
    const statusResponse = await axios.get('https://api.github.com/repos/mission-apprentissage/upptime/contents/history/summary.json')

    const jsonStatusb64 = statusResponse.data.content
    const decodedB64 = Buffer.from(jsonStatusb64, "base64");
    const jsonData = JSON.parse(decodedB64.toString());
    const dataFormatted = jsonData.map(( { status, name, slug } : any) => ( { status, name, id: slug }))
    return dataFormatted
}

export const getSingleMd = async (path: string) => {
    const statusResponse = await axios.get(`https://api.github.com/repos/betagouv/beta.gouv.fr/${path}`)

    const jsonStatusb64 = statusResponse.data.content
    const decodedB64 = Buffer.from(jsonStatusb64, "base64");
    const stringData = decodedB64.toString();
    return stringData 
}