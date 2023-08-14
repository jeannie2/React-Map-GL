import axios from 'axios'
// import { toast } from 'react-toastify'

export const fetcher = (url) => axios.get(url).then((res) => res.data)

export const handleErrors = (err) => {
  // Console Log for debugging purposes
  if (err.response) {
    console.log('REQUEST ERROR: ', err.response) // eslint-disable-line
  } else {
    console.log('ERROR: ', err) // eslint-disable-line
  }

  switch (err.response.status) {
    case 406: {
      err.response.data.errors.forEach((error) => {
        // toast.error(error.msg)
        console.log(error)
      })
      break
    }
    default: {
      // toast.error('Something is wrong with the server')
      console.log('Something is wrong with the server')
    }
  }
}
