import useSWR from 'swr'
import { fetcher } from '../hooks/_utils.jsx'

const useGraffitiAPI = () => {
  const { data, error, isLoading, isValidating } = useSWR('https://data.cityofnewyork.us/resource/8q69-4ke5.json?status=Open&descriptor=Graffiti', fetcher) // mutate

  return {
    graffitiData: data, error, isLoading, isValidating
  }
}

export default useGraffitiAPI

//  data: data,
//     data2: data,
//     error: error,
//     isLoading: isLoading,
//     isValidating: isValidating
