import { useState, useEffect } from 'react'
// import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop'
import { supabaseClient } from '../supabaseClient.js'
import { useNavigate, useParams } from 'react-router-dom'

import { FileUploader } from 'react-drag-drop-files'

const fileTypes = ["JPG", "PNG"];
const boxArea = <div className="dropArea">DROP IMAGE HERE </div>

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
        <h1>Hello To Drag & Drop Files</h1>
        <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
                // eslint-disable-next-line
                children={boxArea}
            />
            <p>{file ? `Image added successfully. File name: ${file[0].name}` : "no files uploaded yet"}</p>
    </>
    )
}


export default DragAndDrop

    //    <FilesDragAndDrop
    //         onUpload={(file) => handleChange(file)
    //         // onUpload={(file) => console.log(file.name)
    //         }
    //         count={3}
    //         formats={['jpg', 'png']}
    //         containerStyles={{
    //             width: '50vw',
    //             height: '60vh',
    //             border: '5px dashed #cccccc',
    //             margin: 'auto',
    //             marginTop: '10%'
    //         }}
    //         openDialogOnClick
    //     >
    //         <h1 style={{
    //             position: 'relative',
    //             top: '40%'
    //             // marginTop: '30%'
    //         }}>
    //             DROP IMAGE HERE
    //         </h1>
    //     </FilesDragAndDrop>
