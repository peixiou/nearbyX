import { useState } from 'react';
import Map from './components/Map';
import OpenScreen from './components/OpenScreen';
import Search from './components/Search';


function App() {

  const [visible, setVisible] = useState(true)



  const handleOpenMap=()=>{
    setVisible(false)
  }

  return (
    <div className="h-screen">
      {visible && <OpenScreen onClick={handleOpenMap} a={'b'}></OpenScreen>}
      <Map></Map>
      <Search onSearch={(data)=>{window.console.log('------',data)}}></Search>
    </div>
  );
}

export default App;
