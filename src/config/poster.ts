import axios from 'axios'

const fetcher = (method: string, url: string, data: any) => {
  // console.log(method)
  // console.log(url)
  // console.log(data)
  try {
    axios({
      method,
      url,
      data: JSON.parse(data)
    });
  } catch (error) {
    

    return error
  }
}

export default fetcher