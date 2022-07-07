import './App.css';

import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";

//components
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Visualiser from "./pages/Visualiser";
import Login from "./pages/Login";
import About from "./pages/About";

const getDesignTokens = (mode) => ({
    palette: {
        mode,
        ...(mode === 'light'
            ? {
                // palette values for light mode
                // primary: amber, //for button background
                // styleOverrides:{
                //     background: {
                //         default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                //     }
                // }
            }
            : {
                // palette values for dark mode
                // primary: deepOrange,
                // background: {
                //     default: "blue"
                // }
            }),
    },
});

function App() {
    const [mode, setMode] = useState('light');
    // Update the theme only if the mode changes
    const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode])
    useEffect(()=>{
        const m = localStorage.getItem('mode');
        if (m !== undefined) {
            setMode(m)
        }
    },[])

    useEffect(()=>{
        localStorage.setItem('mode', mode)
    },[mode])




    return (
    <ThemeProvider theme={theme}>
        <CssBaseline>
          <header>
            <Navbar mode={mode} setMode={setMode}/>
          </header>
          <main>
              <Routes>
                  {/*<Route path='/' element={<Homepage/>} />*/}
                  <Route path='/' element={<Login/>} />
                  <Route path='/visualiser' element={<Visualiser mode={mode}/>} />
                  <Route path='/about' element={<About/>} />
              </Routes>
          </main>
          <Footer/>
        </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
