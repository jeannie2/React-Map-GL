import useSWR from 'swr'
import { fetcher } from '../hooks/_utils.jsx'

const useNapkin = () => {
  const { data, error, isLoading, isValidating } = useSWR('https://data.cityofnewyork.us/resource/8q69-4ke5.json?status=Open&descriptor=Graffiti', fetcher) // mutate

  return {
   data, error, isLoading, isValidating
  }
}

export default useNapkin

//  data: data,
//     data2: data,
//     error: error,
//     isLoading: isLoading,
//     isValidating: isValidating
