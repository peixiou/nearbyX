import { useState } from 'react';
import Map from './components/Map';
import OpenScreen from './components/OpenScreen';
import Search from './components/Search';
import PlaceList from './components/PlaceList';


function App() {

  const [visible, setVisible] = useState(true)
  const [searchData,setSearchData]=useState()

  const handleOpenMap=()=>{
    setVisible(false)
  }

  const handleSearch=(data)=>{
    setSearchData(data)
  }

  return (
    <div className="h-screen">
      {visible && <OpenScreen onClick={handleOpenMap} a={'b'}></OpenScreen>}
      <Map action={{type:1,data:searchData}}></Map>
      <Search onSearch={handleSearch}></Search>
      <PlaceList></PlaceList>
    </div>
  );
}

export default App;
