import axios from 'axios'

/**
 * Get status json
 * @returns json of status
 */
const getStatusMap = async () => {
    const statusResponse = await axios.get('https://api.github.com/repos/mission-apprentissage/upptime/contents/history/summary.json')

    const jsonStatusb64 = statusResponse.data.content
    const decodedB64 = Buffer.from(jsonStatusb64, "base64");
    const jsonData = JSON.parse(decodedB64.toString());
    return jsonData
}
/**
 * Format status map indexed by url
 * @returns map of status indexed by url
 */
export const getStatusMapByUrl = async () => {
    const jsonData = await getStatusMap()
    const dataMap = jsonData.reduce((acc: {}, curr: { status: string, name: string, id: string, url: string }) => {
        const formattedUrl = new URL(curr.url)
        return  {
            ...acc,
            [formattedUrl.hostname]: curr.status
        }

    }, {});
    return dataMap

}
/**
 * Format status map indexed by id
 * @returns map of status indexed by id
 */
export const getStatusMapById = async () => {
    const jsonData = await getStatusMap()
    const dataMap = jsonData.reduce((acc: {}, curr: { status: string, name: string, id: string, url: string }) => {
        return  {
            ...acc,
            [curr.id]: curr.status
        }

    }, {});
    return dataMap
}
/**
 * Get single mardown
 * @param path name of the mardown
 * @returns mardown as string
 */
export const getSingleMd = async (path: string) => {
    const statusResponse = await axios.get(`https://api.github.com/repos/betagouv/beta.gouv.fr/contents/content/_startups/${path}.md`)

    const jsonStatusb64 = statusResponse.data.content
    const decodedB64 = Buffer.from(jsonStatusb64, "base64");
    const stringData = decodedB64.toString();
    return stringData
}

/**
 * getStartup
 * @returns 
 */
export const getStartup = async () => {
    const startups = await axios.get('https://beta.gouv.fr/api/v2.5/startups.json')
    return startups.data.data;
}