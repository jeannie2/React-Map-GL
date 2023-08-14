import React, {useState} from 'react'
import { supabaseClient } from '../supabaseClient.js'

const useAllRecords = async () => {
    const [loading, setLoading] = useState(false)

    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .from('graffiti')
        .select('*')    // useparams
      if (!error && data) {
        console.log(data)
        return data
      }
    } catch(error) {
      console.log(error)
    }
    setLoading(false)

    return getAllRecords
  }

export default useAllRecords
