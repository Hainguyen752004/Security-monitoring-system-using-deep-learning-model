import './App.css'
import NavBar from "./components/NavBar.tsx";
import {ThemeProvider} from "./components/theme-provider.tsx";
import {Route, Routes} from "react-router-dom";
import About from "./pages/About.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";


function App() {


    return (

        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

            <NavBar/>

            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                </Route>
            </Routes>

        </ThemeProvider>

    )
}

export default App
