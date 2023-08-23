import { useEffect, useState, useMemo } from 'react'
import {Link} from 'react-router-dom'
import Map, {Popup, Marker, FullscreenControl, ScaleControl, NavigationControl, GeolocateControl } from 'react-map-gl'
import { supabaseClient } from '../supabaseClient.js'

import Loading from '../components/Loading'
import Pin from '../components/Pin.jsx'
import Controls from "../components/Controls.jsx"
import useGraffitiAPI from '../hooks/useGraffitiAPI'
// import useDBRecords from '../hooks/useDBRecords'

function MapPage() {
  const [ popupInfo, setPopupInfo ] = useState(null);
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)

  const { graffitiData, graffitiError, isLoading } = useGraffitiAPI()
  const [ DBdata, setDBdata ]= useState()
  const [ combined, setCombined ] = useState('')

  const [ status, setStatus] = useState('');

  useEffect(() => {
    getDBRecords()

    if (graffitiData) {
      setStatus(graffitiData);
    }
  }, [graffitiData])

  useEffect(() => {
    if(DBdata) {
      console.log(DBdata)
      let APIandDBdata = DBdata.concat(graffitiData)
      // let APIandDBdata = [...mango, ...data]
      setCombined(APIandDBdata)
      console.log("API and DB data: ")
      console.log(combined)
      // setCombined([])
    }
  }, [DBdata])

  const getDBRecords = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .from('graffiti')
        .select('*')  // useparams
      if (!error && data) {
        setDBdata(data)
        // console.log(data)
        // return DBdata
      }
    } catch(error) {
      console.log(error)
    }

    setLoading(false)
    // console.log("mango " + mango)
    // return getAllRecords
  }

  // another way which works
  const pins = useMemo(() => {
    if (combined?.length === 0) {
      console.log("no records returned from API and database")
      // alert("no pins")
    } else {
      return combined?.map((city, index) => {
        if (!city?.longitude || !city?.latitude) {
          // handle missing longitude or latitude properties
          return null;
        }

        return (
          <Marker
            key={`marker-${index}`}
            longitude={parseFloat(city.longitude)} // data from db is float
            latitude={parseFloat(city.latitude)} // data from db is float
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setPopupInfo(city);
            }}
          >
            <Pin />
          </Marker>
        );
      });
    }
  }, [combined]);

  // if ( loading || isLoading ) return <Loading />
  // if ( error || graffitiError ) return <div>There was an error fetching data</div>

  return (
    <>
    <Map
      mapboxAccessToken="pk.eyJ1IjoicGt3aWwiLCJhIjoiY2xoN3IydjA4MDE5czNwcGIwZmp2NWlvNyJ9.CWeoZE7F5bMINRGrbNNzDQ"
      initialViewState={{
        latitude: 40.61,
        longitude: -73.99,
        zoom: 10,
        bearing: 0,
        pitch: 0
      }}
      style={{width: '100%', height: '90vh'}}
      mapStyle="mapbox://styles/pkwil/clhab6j5i00uk01qthcfqanu3"
      // ><FullscreenControl /> </Map>
      >

        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}
        {/* {!pins  ? <h1>NO PINs</h1> : <h1>Yes pins</h1>} */}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.longitude}
            latitude={popupInfo.latitude}
            onClose={() => setPopupInfo(null)}
          >
            <div id="popup">
              <p><span>Record creation date:</span> <br/>{popupInfo.created_date} </p>
              <p><span>Address: </span>{popupInfo.incident_address}, {popupInfo.incident_zip}</p>
              <p><span>Borough: </span> {popupInfo.borough} </p>

              <div>
                <Link to={`/${popupInfo.unique_key}`}>Photo gallery</Link>
              </div>
              <div>
                <Link to={`/imageupload/${popupInfo.unique_key}`}>Upload image</Link>
              </div>

            </div>
            {/* <img width="100%" src={popupInfo.image} /> */}
          </Popup>
        )}
      </Map>
      <Controls/>
    </>
  );
}

export default MapPage
