import { useState, useEffect } from 'react'
import Lenis from "@studio-freight/lenis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Pages_css/App.css'
import Home from './Pages/Home'
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Mov from './component/Mov';
import Signup from './component/Signup';
import Login from './component/Login';
import Pricing from './component/Pricing';
import Movs from './component/Movs';
import Page1 from './component/Page1';

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.9, // Adjusts smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: "vertical", // Can be "horizontal" as well
      smooth: true,
      smoothTouch: false, // Set true if you want smooth scrolling on touch devices
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup on unmount
  }, []);

  return (
  
    <Router>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/Movies" element={<Mov/>}/>
        <Route path='/Pricing' element={<Pricing/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Movies/:id' element={<Movs/>}/>
        <Route path='/Video/:id' element={<Page1/>}/>

      </Routes>
      {/* <Footer/> */}
    </Router>
    
  )
}

export default App
