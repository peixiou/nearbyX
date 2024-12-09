import { useEffect, useState } from "react"

function Map() {

    


    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        getLocation()
    },[])

    const initLocation = (position) => {

        setUserLocation(
            {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        )

        const l = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)


        var mapOptions = {
            zoom: 18,
            center: l,
            mapTypeId: 'roadmap',
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapId: 'b637233970a9d550'
        };
        const map = new window.google.maps.Map(document.getElementById("map"), mapOptions);

    }

    const showError = (error) => {

    }

    const getLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initLocation, showError)
        } else {

        }
    }



    return (
        <div id="map" className="h-screen z-0"></div>
    )
}

export default Map;