import axios from 'axios'

const fetcher = async (method: string, url: string) => {
  // console.log(method)
  // console.log(url)
  try {
    const queryResult = await axios({
      method,
      url
    });

    return queryResult
    
  } catch (error) {
    return error
  }
}

export default fetcher