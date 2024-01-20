import { createRef, createContext } from "react";
import { fabric } from 'fabric'

import MyFabric from "./components/MyFabric";
import Toolbar from "./components/Toolbar/Toolbar";
import { BtnStatusProvider } from "../src/contexts/BtnStatusContext"

export const FabricContext = createContext();

function App () {

  return(
    <div className="app">
      <FabricContext.Provider value={createRef()}>
        <BtnStatusProvider>
          <Toolbar />
        </BtnStatusProvider>
        <MyFabric />
      </FabricContext.Provider>
    </div>
    
  )
}

export default App
