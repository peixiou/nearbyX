import { useEffect, useState } from "react"
import imgNoLocation from '../../assets/nolocation.png'
function Map(porps) {

    const [error, setError] = useState(false)

    useEffect(() => {
        getLocation()
    }, [])

    const showError = () => {
        setError(true)
    }

    const initLocation = (postion) => {
        const userLocation = new window.google.maps.LatLng(postion.coords.latitude, postion.coords.longitude)
        var mapOptions = {
            zoom: 18,
            center: userLocation,
            mapTypeId: 'roadmap',
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapId: 'b637233970a9d550'
        };
        new window.google.maps.Map(document.getElementById('map'), mapOptions)


    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initLocation, showError)
        } else {
            showError()
        }
    }


    return (
        <div id="map" className='h-screen z-0'>
            {
                error && <div className="fixed h-64 bottom-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl flex flex-col items-center justify-center">
                    <img src={imgNoLocation} alt="" srcset="" />
                </div>
            }
        </div>
    )
}

export default Map