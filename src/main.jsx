import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./index.css"
import Home     from "./pages/Home"
import About    from "./pages/About"
import Work     from "./pages/Work"
import Research from "./pages/Research"
import Contact  from "./pages/Contact"
import Navbar   from "./components/Navbar"
import Footer   from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/about"    element={<About />} />
        <Route path="/work"     element={<Work />} />
        <Route path="/research" element={<Research />} />
        <Route path="/contact"  element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
)