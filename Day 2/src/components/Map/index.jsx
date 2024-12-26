import { useEffect, useRef, useState } from "react"



import imgNoLocation from '../../assets/nolocation.png'
import EventBus from "../../utils/EventBus";
import EventEmitter from "../../utils/EventEmitter";
const directionsRenderer = new window.google.maps.DirectionsRenderer();

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
function Map(porps) {

    const { action } = porps;
    const [error, setError] = useState(false)
    const [places, setPlaces] = useState([])
    const map = useRef()

    useEffect(() => {
        getLocation()

    }, [])

    useEffect(() => {
        EventEmitter.on('search', (data) => {
            console.log(data);
            if (data) {
                doSearchNearby(data)
            }
        })

        EventEmitter.on('renderRoute', (pos) => {
            renderRoute(pos)
        })

    }, [])


    const doSearchNearby = (data = {}) => {

        const { type, radius } = data;

        window.Place.searchNearby({
            // required parameters
            fields: ["displayName", "photos", "location", "businessStatus", "rating", "formattedAddress", "reviews"],
            locationRestriction: {
                center: window.userLocation,
                radius: radius,
            },
            // optional parameters
            includedPrimaryTypes: [type],
            maxResultCount: 20,
            rankPreference: window.SearchNearbyRankPreference.POPULARITY,
            language: "zh-tw",
            region: "us",
        }).then(res => {
            const { places } = res;
            setPlaces(places)
            map.current.setZoom(getZoomLevel(radius))
            EventEmitter.emit('nearbyPlaces', places)
        })

    }

    useEffect(() => {
        if (places.length > 0) {
            places.forEach(item => {
                new window.AdvancedMarkerElement({
                    map: map.current,
                    position: item.location,
                    content: new window.PinElement({
                        background: "#FBBC04",
                        borderColor: '#137333',
                        glyphColor: "white"
                    }).element
                })
            })
        }
    }, [places])

    const showError = () => {
        setError(true)
    }

    const initLocation = (postion) => {

        window.userLocation = new window.google.maps.LatLng(postion.coords.latitude, postion.coords.longitude)

        var mapOptions = {
            zoom: 18,
            center: window.userLocation,
            mapTypeId: 'roadmap',
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            mapId: 'b637233970a9d550'
        };
        map.current = new window.google.maps.Map(document.getElementById('map'), mapOptions)

        new window.AdvancedMarkerElement({
            map: map.current,
            position: window.userLocation
        })
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initLocation, showError)
        } else {
            showError()
        }
    }


    const renderRoute = (pos) => {
        // 创建 Directions Service 和 Directions Renderer
        // 回顾第二天的知识
        const directionsService = new window.google.maps.DirectionsService();


        directionsRenderer.setMap(map.current)
        directionsService.route({
            origin: window.userLocation,
            destination: pos,
            travelMode: window.google.maps.TravelMode.WALKING
        }, (res, status) => {
            
            if (status === 'OK') {
                directionsRenderer.setDirections(res)
            } else {
                alert('路线绘制失败？')
            }
        })
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