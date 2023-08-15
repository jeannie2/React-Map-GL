import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container } from '@mui/material'

const FormSubmittedPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 5000)
  // eslint-disable-next-line
  }, [])

  return (
    <>
      <Container id="form-submitted-page" sx={{textAlign: 'center'}}>
        <h2>Form submitted. Please check the map!</h2>
      </Container>
    </>
  )
}

export default FormSubmittedPage
