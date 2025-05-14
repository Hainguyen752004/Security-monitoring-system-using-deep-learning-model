import './App.css'
import NavBar from "./components/NavBar.tsx";
import {ThemeProvider} from "./components/theme-provider.tsx";

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
       <NavBar>
       </NavBar>
    </ThemeProvider>
  )
}

export default App
