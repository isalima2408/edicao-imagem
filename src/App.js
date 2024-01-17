import { createRef, createContext } from "react";
import { fabric } from 'fabric'

import MyFabric from "./components/MyFabric";
import Toolbar from "./components/Toolbar/Toolbar";
import Toolkit from "./components/Toolkit/Toolkit"
import Download from './components/Download/Download'
import { BtnStatusProvider } from "../src/contexts/BtnStatusContext"

export const FabricContext = createContext();

function App () {

  return(
    <div className="containerA">
      <FabricContext.Provider value={createRef()}>
        <BtnStatusProvider>
          <Toolbar />
        </BtnStatusProvider>
        <MyFabric />
        <Toolkit />
      </FabricContext.Provider>
    </div>
    
  )
}

export default App
