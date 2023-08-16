import { useEffect } from 'react'
import DragAndDrop from "../components/DragAndDrop"
import Container from '@mui/material/Container'

function ImageUploadPage() {


  // useEffect(() => {
  //   const cleanup = () => {
  //     // Remove the event listener here
  //   };

  //   return cleanup;
  // }, []);

  return (
    <>
    <Container id="image-upload-page" maxWidth={false} disableGutters sx={{textAlign: 'center', margin:'0', padding: '0', height: '100vh', border: 1, background: 'linear-gradient(to top, #eef2f3, #8e9eab)'}}>
        <DragAndDrop id="drag-drop-comp" />
      </Container>
    </>

  )
}

export default ImageUploadPage
