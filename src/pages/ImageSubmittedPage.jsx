import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

const ImageSubmittedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000)
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <Container id="image-submitted-page" sx={{textAlign: 'center'}}>
        <h2>Your image has been submitted. Please check the map and view all images by clicking the marker.</h2>
      </Container>
    </>
  )
}

export default ImageSubmittedPage
