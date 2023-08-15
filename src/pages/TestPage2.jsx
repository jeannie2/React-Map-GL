import { useState, useEffect } from 'react'
import { supabaseClient } from '../supabaseClient.js'

import useNapkin from '../hooks/useNapkin'
import Loading from '../components/Loading'

const TestPage2 = () => {
  const { data, error, isLoading } = useNapkin()
  // const [loading, setLoading] = useState(false)

  if (isLoading) return <Loading />
  if (error) return <div className="text-center text-white">There was an error fetching data</div>

  return (
    <>
    <h1>testpage 2</h1>
    {data?.length === 0 ? (
          <div>
            <p >No records returned by API </p>
          </div>
        ) : ( <ul>
                {data?.map((tip) => (
                  <li key={tip.unique_key}>{tip.created_date}</li>
                ))}
                </ul>
              )}
    </>
      )
      }


export default TestPage2

      {/* {data?.length === 0 ? ( */}
