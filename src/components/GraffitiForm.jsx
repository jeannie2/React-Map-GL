import { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { supabaseClient } from '../supabaseClient.js'
import { v4 as uuidv4 } from 'uuid';

import ErrorComp from "./ErrorComp"

const GraffitiForm = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const addressRef = useRef(null)
  const zipRef = useRef(null)
  const boroughRef = useRef(null)
  const longitudeRef = useRef(null)
  const latitudeRef = useRef(null)

  const [errorFlag, setErrorFlag] = useState({
    errorStatus: false,
    errorMsg: ''
  })

  // const [address, setAddress] = useState("")
  // const [zip, setZip] = useState("")
  // const [borough, setBorough] = useState("")
  // const [longitude, setLongitude] = useState("")
  // const [latitude, setLatitude] = useState("")

  const handleSubmit = async (e) => {
    const formData = new FormData(e.target)
    // formData.set("status", "open")
    const inputObject = Object.fromEntries(formData) // convert FormData object to a JSON object

    e.preventDefault()
    if(
      !addressRef.current?.value ||
      !zipRef.current?.value ||
      !boroughRef.current?.value ||
      !longitudeRef.current?.value ||
      !latitudeRef.current?.value
    ) {
      setErrorFlag( {
        errorStatus: true,
        errorMsg: "Please fill all the fields" })
        return
      }
    try {
        setErrorFlag( {
          errorStatus: false,
          errorMsg: ""
        })
        setLoading(true)
        const { data, error } = await supabaseClient
          .from('graffiti')
          .insert([
            {
              // Array.from(formData.entries(()
              // .map((entry, index))
              incident_zip: inputObject.zip,
              incident_address: inputObject.address,
              borough: inputObject.borough,
              longitude: inputObject.longitude,
              latitude: inputObject.latitude,
              unique_key: uuidv4(),
              status:  "open"
            }
          ]

          )
        if (!error && data) {
          setMsg(
            "Contact added successfully"
          );
          console.log(msg)
          // res.send("contact added successfully")
        }
      } catch (error) {
        setErrorFlag( {
          errorStatus: true,
          errorMsg: "Error in adding contact details"
        })
      }
      setLoading(false)
      resetForm()
      navigate('/form-submitted')
  }

  const resetForm = () => {
    addressRef.current.value = ""
    zipRef.current.value = ""
    boroughRef.current.value = ""
    longitudeRef.current.value = ""
    latitudeRef.current.value = ""
  };

  return (
    <>
      { errorFlag.errorStatus ? <ErrorComp error={errorFlag.errorMsg}/> : null }
      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Address</label>
        <input name="address" placeholder="address" type="text" required ref={addressRef}/>
        {/* value={address}  onChange={(e) => setAddress(e.target.value)}  */}

        <label htmlFor="zip">zip code</label>
        <input name="zip" placeholder="zip code" type="number" required ref={zipRef}/>
        {/* value={zip}  onChange={(e) => setZip(e.target.value)} */}

        <label htmlFor="borough">Borough</label>
        <input name="borough" placeholder="borough" type="text" required ref={boroughRef}/>
        {/* value={borough}  onChange={(e) => setBorough(e.target.value)}  */}

        <label htmlFor="longitude">Longitude</label>
        <input  name="longitude" placeholder="number between -180 and 180 (e.g. -73.974)" type="float" required ref={longitudeRef}/>
         {/* value={longitude} onChange={(e) => setLongitude(e.target.value)}  */}

        <label htmlFor="latitude">Latitude</label>
        <input  name="latitude" placeholder="number between -90 and 90 (e.g. 40.781)" type="float" required ref={latitudeRef}/>
        {/* value={latitude}  onChange={(e) => setLatitude(e.target.value)}  */}

        <button type="submit">SUBMIT</button>
      </form>
    </>
  )
}

export default GraffitiForm
