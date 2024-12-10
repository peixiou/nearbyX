import { useState } from 'react';
import './App.css';
import Map from './components/Map';
import OpenScreen from './components/OpenScreen';
import Search from './components/Search';
import { data } from 'autoprefixer';

function App() {

  const [visible,setVisible]=useState(true);
  const [action,setAction]=useState(null);

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
    </div>
  );
}

export default App;
