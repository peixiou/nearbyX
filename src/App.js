import { useState } from 'react';
import './App.css';
import Map from './components/Map';
import OpenScreen from './components/OpenScreen';
import Search from './components/Search';

function App() {

  const [visible,setVisible]=useState(true);

  const handleStart=()=>{
    setVisible(false);
  }


  const handleSearch=(query)=>{
    console.log(query);
    
  }

  return (
    <div className="app h-screen">
      {visible && <OpenScreen onClick={handleStart}/>}
      <Map />
      <Search onSearch={handleSearch}></Search>
    </div>
  );
}

export default App;
