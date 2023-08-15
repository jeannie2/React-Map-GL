import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { supabaseClient } from '../supabaseClient.js'

import Container from '@mui/material/Container';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'

import Loading from '../components/Loading'

const GraffitiShowPage = () => {
  const [loading, setLoading] = useState(false)
  const params = useParams();
  const [dumpling, setDumpling] = useState()
  const [lemon, setLemon] = useState()
  // const [error, setError] = useState(null)

  //  if (Loading) return <Loading /> //isLoading
  // if (error) return <div className="text-center text-white">There was an error fetching data</div>

  useEffect(() => {
    getDatabaseLink()
    // console.log(dumpling)
    displayList()
  }, [])

  const getDatabaseLink = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .storage
        .from('graffiti')
        .getPublicUrl(`${params.id}`)
        // .getPublicUrl(`public`) // useparams
      if (!error && data) {
        // console.log(data.publicUrl)
        console.log(data.publicUrl)
        setDumpling(data.publicUrl)
        // return data
      }
    } catch(error) {
      console.log(error)
    }
    setLoading(false)
  }

  const displayList = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabaseClient
      .storage
      .from('graffiti')
      // .list('public')
      .list(`${params.id}`, {
      // .list('public', { // useparams
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },

      })

      if (!error && data) {
        console.log(data)
        setLemon(data)
        return data
      }
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
  }

 // if (error) return <div>Error</div>

  return (
    <>
      {lemon?.length === 0 ? ( // lemon?.tips?.length. case below applies if no images in folder or folder doesnt exist
        <Container id="graffiti-show-page" sx={{textAlign: 'center'}}>
          <h1>No images yet! Upload to see it here</h1>
        </Container>
      ) : (
        <ImageList variant="masonry" cols={3} gap={8}>
        {lemon?.map((item) => (
            <ImageListItem key={item.id}>
              <img
                src={`${dumpling}/${item.name}?w=248&fit=crop&auto=format`}
                srcSet={`${dumpling}/${item.name}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.name}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </>
  )
}

export default GraffitiShowPage
