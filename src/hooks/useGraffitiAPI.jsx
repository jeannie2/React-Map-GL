import useSWR from 'swr'
import { fetcher } from '../hooks/_utils.jsx'

const useGraffitiAPI = () => {
  const { data, error, isLoading, isValidating } = useSWR('https://data.cityofnewyork.us/resource/8q69-4ke5.json?status=Open&descriptor=Graffiti', fetcher)

  return {
    graffitiData: data, graffitiError: error, isLoading, isValidating
  }
}

export default useGraffitiAPI
