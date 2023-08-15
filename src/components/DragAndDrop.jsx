import { useState, useEffect } from 'react'
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop'
import { supabaseClient } from '../supabaseClient.js'
import { useNavigate, useParams } from 'react-router-dom'

const DragAndDrop = () => {
    // const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams();

     useEffect(() => {
    const cleanup = () => {
      // Remove the event listener here
    };

    return cleanup;
  }, []);


    const handleChange = async (file) => {
        try {
            // setErrorMsg("")
            setLoading(true)
            const { data, error } = await supabaseClient.storage
                .from('graffiti')
                // .upload(`./${file[0].name}`, file)
                .upload(`${params.id}/${file[0].name}`, file[0], {
                // .upload(`${file[0].name}`, file[0], { // useparams
                    cacheControl: '3600',
                    upsert:true
                    // contentType: "image/jpg"
                })
                console.log(file)

            if (!error && data) {
                console.log(data)
                // setMsg(
                //   "file uploaded successfully"
                // );
                // console.log(msg)
            }
        } catch (error) {
            // setErrorMsg("Error in adding contact details")
            console.log(`error: `, error)
            }
            setLoading(false)
            navigate('/image-submitted')
            // resetForm()
    }

    return (
        <FilesDragAndDrop
            onUpload={(file) => handleChange(file)
            // onUpload={(file) => console.log(file.name)
            }
            count={3}
            formats={['jpg', 'png']}
            containerStyles={{
                width: '50vw',
                height: '60vh',
                border: '5px dashed #cccccc',
                margin: 'auto',
                marginTop: '10%'
            }}
            openDialogOnClick
        >
            <h1 style={{
                position: 'relative',
                top: '40%'
                // marginTop: '30%'
            }}>
                DROP IMAGE HERE
            </h1>
        </FilesDragAndDrop>
)}

export default DragAndDrop
