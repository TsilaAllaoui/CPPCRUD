import '../css/App.scss'
import View from './View';
import Login from './Login';
import { useState } from 'react';

function App() {
  const [datas, setDatas] = useState(null);

  return (
    <div className="App" >
      {datas ? (
        <View datas={datas}/>
      ) :<Login setDatas={setDatas}/>}
    </div>
  )
}

export default App;