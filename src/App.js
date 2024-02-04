import { createRef, createContext } from "react";
import MyFabric from "./components/MyFabric";
import Toolbar from "./components/Toolbar/Toolbar";
import { BtnStatusProvider } from "./contexts/BtnStatusContext"
import { loadFonts } from "./loadFonts/loadFonts";

// contexto do canvas
export const FabricContext = createContext();

function App () {

  loadFonts()

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
