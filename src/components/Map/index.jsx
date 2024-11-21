
import { useEffect, useRef, useState } from 'react';
import './index.css'
import imgNoLocation from '../../assets/nolocation.png'
import EventBus from '../../utils/EventBus';

// 静态函数

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

function MapRender() {

    const [markerLocation, setMarkerLocation] = useState();
    const [error, setError] = useState(false)
    const [places, setPlaces] = useState([])
    const markers = useRef([])
    const map = useRef(null)
    const marker = useRef(null)

    useEffect(() => {
        getLocation()
    }, [])


    useEffect(() => {
        if(!markerLocation) return;
        EventBus.on('searchNearbyPlaces', (data) => {
            const { type, radius } = data;
            
            window.Place.searchNearby({
                // required parameters
                fields: ["displayName", "reviews", "location", "businessStatus", "rating", "formattedAddress", "photos"],
                locationRestriction: {
                    center: markerLocation,
                    radius: radius,
                },
                // optional parameters
                includedPrimaryTypes: [type],
                maxResultCount: 10,
                rankPreference: window.SearchNearbyRankPreference.POPULARITY,
                language: "zh-tw",
                region: "cn",
            }).then(res => {
                const { places } = res;
                markers.current.forEach(item => {
                    item.setMap(null)
                })
                
                setPlaces(places)
              
                
                EventBus.emit('placesChange',{places:places.map(item=>item.id)})
            })

            // 根据半径改变zoom
            map.current.setZoom(getZoomLevel(radius))
        })
        EventBus.on('renderRoute',(pos)=>{
            
            renderRoute(pos)
        })
    }, [markerLocation])

    useEffect(() => {
        if (places.length > 0) {
            places.forEach(item => {
                markers.current.push(new window.AdvancedMarkerElement({
                    map: map.current,
                    position: item.location,
                    content:new window.PinElement({
                        background: "#FBBC04",
                        borderColor:'#137333',
                        glyphColor: "white"
                      }).element
                }))
            })
        }
    }, [places])

    const initLocation = (position) => {
        setMarkerLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
        window.userLocation = new window.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });

        var mapOptions = {
            zoom: 18,
            center: window.userLocation,
            mapTypeId: 'roadmap',
            fullscreenControl:false,
            streetViewControl:false,
            mapTypeControl: false,
            mapId: 'b637233970a9d550'
        };
        map.current = new window.google.maps.Map(document.getElementById('map'), mapOptions);
        const userMarker = new window.AdvancedMarkerElement({
            map: map.current,
            position: window.userLocation
        });
    }
    const showError = () => {
        setError(true)
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(initLocation, showError);
        } else {
            showError()
        }
    }

    const renderRoute=(pos)=> {
        // 创建 Directions Service 和 Directions Renderer
        const directionsService = new window.google.maps.DirectionsService();
        const directionsRenderer = new window.google.maps.DirectionsRenderer();
      
        directionsRenderer.setDirections({ routes: [] }); // 清空路线数据
        directionsRenderer.setMap(null);
        directionsRenderer.setMap(map.current);

        // 请求路线
        directionsService.route(
            {
                origin: { lat: markerLocation.lat, lng: markerLocation.lng },
                destination: pos,
                travelMode: window.google.maps.TravelMode.DRIVING
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                } else {
                    window.alert("无法计算路线: " + status);
                }
            }
        );
    }

    return (
        <div id="map" className='h-screen z-0'>
           
            {error && <div className="fixed h-64 bottom-0 bg-white w-full rounded-tl-3xl rounded-tr-3xl flex flex-col items-center justify-center">
                <img src={imgNoLocation} alt="" srcset="" />
                <div>該裝置不支持 GPS</div>
            </div>}
        </div>
    )
}


export default MapRender