import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabaseClient } from '../supabaseClient.js'
import { FileUploader } from 'react-drag-drop-files'

const fileTypes = ["JPG", "PNG"];
const boxArea = <div id="drop-area"><h1 id="drop-area-text">DROP IMAGE HERE (acceptable formats: jpg, png) </h1></div>

const DragAndDrop = () => {
    // const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    const [ file, setFile] = useState(null)

//   useEffect(() => {
//     const cleanup = () => {
//         // Remove the event listener here
//     };

//     window.addEventListener("beforeunload", cleanup);

//     return () => {
//         window.removeEventListener("beforeunload", cleanup);
//     };
// }, []);

    const handleChange = async (file) => {
        try {
            setFile(file)
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
        <>
        <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                // eslint-disable-next-line
                children={boxArea}
            />
            <h3>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</h3>
    </>
    )
}


export default DragAndDrop
