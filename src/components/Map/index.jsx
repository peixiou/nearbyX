import { useEffect, useRef, useState } from "react"
import EventEmitter from "../../utils/EventEmitter";
import imgNoLocation from '../../assets/nolocation.png'

function getZoomLevel(radius) {
    // 半径到缩放级别的简单映射
    const zoomRadiusMap = [
        { radius: 100, zoom: 18 },
        { radius: 200, zoom: 17 },
        { radius: 500, zoom: 16 },
        { radius: 1000, zoom: 15.5 },
        { radius: 3000, zoom: 14 },
        { radius: 5000, zoom: 14.5 },
    ];

    for (const entry of zoomRadiusMap) {
        if (radius <= entry.radius) return entry.zoom;
    }

    return 10; // 默认缩放级别
}


function Map(props) {
    const { action = {} } = props;
    const [userLocation, setUserLocation] = useState(null);
    const [error,setError]=useState(false)
    const map = useRef(null);

    useEffect(() => {
        getLocation()

        EventEmitter.on('doNearby', (data) => {
            searchNearyby(data);
            map.current.setZoom(getZoomLevel(data.radius))
        })
    }, [])


    // useEffect(() => {
    //     console.log('-------', action);
    //     if (!action) return

    //     if (action.type === 2) {
    //         //  搜索附近
    //         searchNearyby(action.data);
    //     }
    // }, [action])

    const initLocation = (position) => {

        setUserLocation(
            {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
        )

        window.userLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude)


        var mapOptions = {
            zoom: 18,
            center: window.userLocation,
            mapTypeId: 'roadmap',
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapId: 'b637233970a9d550'
        };
        map.current = new window.google.maps.Map(document.getElementById("map"), mapOptions);
        new window.AdvancedMarkerElement({
            map: map.current,
            position: window.userLocation
        })
    }

    const showError = (error) => {
        setError(true)
    }

    const getLocation = () => {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initLocation, showError)
        } else {
            showError()
        }
    }



    const searchNearyby = ({ type, radius }) => {

        window.Place.searchNearby({
            // required parameters
            fields: ["displayName", "photos", "location", "businessStatus", "rating", "formattedAddress"],
            locationRestriction: {
                center: window.userLocation,
                radius: radius,
            },
            // optional parameters
            includedPrimaryTypes: [type],
            maxResultCount: 10,
            rankPreference: window.SearchNearbyRankPreference.POPULARITY,
            language: "zh-tw",
            region: "us",
        }).then((results) => {
            const { places } = results;
            console.log(places);
            places.forEach(place => {
                addMarker(place)
            })
        })
    }

    const addMarker = (place) => {
        new window.AdvancedMarkerElement({
            map: map.current,
            position: place.location,
            content: new window.PinElement({
                background: "#FBBC04",
                borderColor: '#137333',
                glyphColor: "white"
            }).element
        })
    }


    return (
        <div id="map" className="h-screen z-0">
            {
                error&&<div className="fixed h-64 bottom-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl flex flex-col items-center justify-center">
                <img src={imgNoLocation} alt="" srcset="" />
                <div>該裝置不支持 GPS</div>
            </div>
            }
        </div>
    )
}

export default Map;