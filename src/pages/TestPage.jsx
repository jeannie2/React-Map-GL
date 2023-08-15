import { useState, useEffect } from 'react'
import { supabaseClient } from '../supabaseClient.js'

const TestPage = () => {
  const [loading, setLoading] = useState(false)
  const [mango, setMango] = useState()
  // const [error, setError] = useState(null)

  useEffect(() => {
    getAllRecords()
    // console.log(dumpling)
    // displayList()
  }, [])

  const getAllRecords = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .from('graffiti')
        .select('*')    // useparams
      if (!error && data) {
        console.log(data)
        setMango(data)
        // return data
      }
    } catch(error) {
      console.log(error)
    }
    setLoading(false)

    // return getAllRecords
  }
    // if (error) return <div>Error</div>

  return (
    <>
    <h1>testpage</h1>
    {mango?.map((item) => (
          <p key={item.id}>{item.address}</p>
      ))}
    </>

  )
      }



export default TestPage
