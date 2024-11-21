import { useState } from 'react';
import './App.css';
import OpenScreen from './components/OpenScreen'
import Map from './components/Map';
import Search from './components/Search';
import EventBus from './utils/EventBus';
import PlaceList from './components/PlaceList';

function App() {
  const [openScreenState, setOpenScreenState] = useState(true)
  const [placeVisible,setPlaceVisible]=useState(false)
  const hanldeOpenScreenClose = () => {
    setOpenScreenState(false)
  }

  const handleSearch=(data)=>{
    EventBus.emit('searchNearbyPlaces',data)
    setPlaceVisible(true)
  }
  return (
    <div className="app h-screen">
      {openScreenState && <OpenScreen onClick={hanldeOpenScreenClose}></OpenScreen>}
      <Map></Map>
      <Search onSearch={handleSearch}></Search>
      {placeVisible&&<PlaceList></PlaceList>}
    </div>
  );
}

export default App;
