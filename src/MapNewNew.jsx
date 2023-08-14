// unecesary rerendering? console.log msgs

import * as React from 'react';
import { useEffect, useState, useMemo } from 'react'
import {Link} from 'react-router-dom'
import Map, {Popup, Marker, FullscreenControl, ScaleControl, NavigationControl, GeolocateControl } from 'react-map-gl'
import { supabaseClient } from './supabaseClient.js'

import Loading from './components/Loading'
import useAdminTips from './useAdminTips'
import useGraffiti from './hooks/useGraffiti'
import useAllRecords from './hooks/useGraffiti'

import Pin from './Pin.jsx'
import useNapkin from './hooks/useNapkin'

function MapComp() {
  // console.log("THIS" + import.meta.env.VITE_UMBRELLA)
  const [popupInfo, setPopupInfo] = useState(null);

  // const { getAllRecords } = useGraffiti()
  // const { data }  = getAllRecords()

  const [loading, setLoading] = useState(false)
  const [mango, setMango] = useState()
  // const [error, setError] = useState(null)

  let [combined, setCombined] = useState('')

  const { data, error, isLoading } = useNapkin()
  const [status, setStatus] = useState('');

  useEffect(() => {
    getAllRecords()
    // let shoe = useAllRecords()
    // setMango(shoe)

    if (data) { // useNapkin
      setStatus(data);
      // console.log(Array.isArray(data))
      // console.log(data)
    }
  }, [data])

  useEffect(() => {
    if(mango) {
      // console.log(Array.isArray(mango))
      // console.log(mango)
      // console.log(data)
      let bag = mango.concat(data)
      // let bag = [...mango, ...data]
      setCombined(bag)
      console.log("bag")
      console.log(combined)
      // setCombined([])
    }
  }, [mango])

  const getAllRecords = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabaseClient
        .from('graffiti')
        .select('*')    // useparams
      if (!error && data) {
        setMango(data)
        // console.log(data)
        // return data
      }
    } catch(error) {
      console.log(error)
    }

    setLoading(false)
    console.log("mango " + mango)
      // return getAllRecords
  }

  console.log(mango)

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

  // if (isLoading) return <Loading />
  // if (error) return <div>There was an error fetching data</div>

  return (
    <>
    <Map
      mapboxAccessToken="pk.eyJ1IjoicGt3aWwiLCJhIjoiY2xoN3IydjA4MDE5czNwcGIwZmp2NWlvNyJ9.CWeoZE7F5bMINRGrbNNzDQ"
      initialViewState={{
        latitude: 40.61,
        longitude: -73.99,
        zoom: 12,
        bearing: 0,
        pitch: 0
      }}
      style={{width: '50%', height: '90vh'}}
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
            <div>
              <p>{popupInfo.created_date} </p>
              <p>{popupInfo.incident_address}, {popupInfo.incident_zip}</p>
              <p>{popupInfo.borough} </p>
              </div><Link to={`/imageupload/${popupInfo.unique_key}`}>Upload image</Link> <div>
              </div><Link to={`/${popupInfo.unique_key}`}>Image gallery</Link><div>
            </div>
            {/* <img width="100%" src={popupInfo.image} /> */}
          </Popup>
        )}

      </Map>
    </>
  );
}

export default MapComp

// another way which works. but seems odd console.log in return statement
// const pins = useMemo(() => {
//   return combined?.length === 0 ? (
//     console.log("no records")
//   ) : (
//     combined?.map((city, index) => (
//       city?.longitude && city?.latitude && (
//         <Marker
//           key={`marker-${index}`}
//           longitude={parseFloat(city.longitude)}
//           latitude={parseFloat(city.latitude)}
//           anchor="bottom"
//           onClick={(e) => {
//             e.originalEvent.stopPropagation();
//             setPopupInfo(city);
//           }}
//         >
//           <Pin />
//         </Marker>
//       )
//     ))
//   );
// }, [combined]);

// original code:
// const pins = useMemo(
//     () =>
//     // dat?.map
//     //  mango &&
// {combined?.length === 0 ? (
//           <div>
//             <p >No records returned by API </p>
//           </div>
//         ) : (
//       combined?.city?.map((city, index) => (
//             // status?.city?.map((city, index) => ( //also works
//         <Marker
//           key={`marker-${index}`}
//           longitude={(city.longitude)}
//           latitude={(city.latitude)}
//           anchor="bottom"
//           onClick={e => {
//             // If we let the click event propagates to the map, it will immediately close the popup
//             // with `closeOnClick: true`
//             e.originalEvent.stopPropagation();
//             setPopupInfo(city);
//           }}
//         >
//           <Pin />
//         </Marker>
//       )
//       )),
//     [combined] //combined. eslint-disable-line react-hooks/exhaustive-deps
//         }
//         );
