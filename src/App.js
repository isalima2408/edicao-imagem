import { createRef, createContext } from "react";
import { BtnStatusProvider } from "./contexts/BtnStatusContext"
import { loadFonts } from "./functions";
import MyFabric from "./components/MyFabric/MyFabric";
import Toolbar from "./components/Toolbar/Toolbar";

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
