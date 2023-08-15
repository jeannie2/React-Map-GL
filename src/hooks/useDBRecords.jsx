// unused file
import { useState } from 'react'
import { supabaseClient } from '../supabaseClient.js'

  const useDBRecords = async () => {
    const [loading, setLoading ] = useState(false)

    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .from('graffiti')
        .select('*')    // useparams
      if (!error && data) {
        // setMango(data)
        // console.log(data)
        return data
      }
    } catch(error) {
      console.log(error)
    }

    setLoading(false)
    // console.log("mango " + mango)
    // return getAllRecords
  }

  export default useDBRecords
