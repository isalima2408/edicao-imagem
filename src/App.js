import { useState, useCallback, createRef, createContext } from "react";
import { fabric } from 'fabric'

import MyFabric from "./components/MyFabric";
import Toolbar from "./components/Toolbar/Toolbar";
import Toolkit from "./components/Toolkit/Toolkit"


export const FabricContext = createContext();

function App () {

  return(
    <FabricContext.Provider value={createRef()}>
      <Toolbar />
      <MyFabric />
      <Toolkit />
    </FabricContext.Provider>
  )
}

export default App
