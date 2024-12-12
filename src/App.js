import { useEffect, useState } from 'react';
import './App.css';
import Map from './components/Map';
import OpenScreen from './components/OpenScreen';
import Search from './components/Search';
import { data } from 'autoprefixer';
import Place from './components/Place';
import EventEmitter from './utils/EventEmitter';
import PlaceList from './components/PlaceList';

function App() {

  const [visible,setVisible]=useState(true);
  const [action,setAction]=useState(null);
  const [placeData,setPlaceData]=useState({})

  const handleStart=()=>{
    setVisible(false);
  }
  


  const handleSearch=(query)=>{
    console.log(query);
    setAction({
      type:2,
      data:query
    })
  }


  return (
    <div className="app h-screen">
     
      {visible && <OpenScreen onClick={handleStart}/>}
      <Map></Map>
      <Search onSearch={handleSearch}></Search>
      <PlaceList></PlaceList>
    </div>
  );
}

export default App;
