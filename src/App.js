import { createRef, createContext } from "react";
import MyFabric from "./components/MyFabric";
import Toolbar from "./components/Toolbar/Toolbar";
import { BtnStatusProvider } from "./contexts/BtnStatusContext"

// contexto do canvas
export const FabricContext = createContext();

function App () {

  return(
    <div className="app">
      <FabricContext.Provider value={createRef()}>
        <BtnStatusProvider>
          <Toolbar />
          <MyFabric />
        </BtnStatusProvider>
      </FabricContext.Provider>
    </div>
  )
}

export default App
