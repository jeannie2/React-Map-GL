import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./css/main.css"

import MapPage from "./pages/MapPage";
import Navbar from "./components/Navbar"
import GraffitiShowPage from "./pages/GraffitiShowPage"
import ImageUploadPage from "./pages/ImageUploadPage"
import FormPage from "./pages/FormPage"
import FormSubmittedPage from "./pages/FormSubmittedPage"
import ImageSubmittedPage from "./pages/ImageSubmittedPage"
import Footer from './components/Footer';

function App() {
  return (
  <>
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<MapPage />} />
      <Route path="/:id" element={<GraffitiShowPage /> } />
      <Route path="/new" element={<FormPage />} />
      <Route path="/imageupload/:id" element={<ImageUploadPage /> } />
      <Route path="/image-submitted" element={<ImageSubmittedPage />} />
      <Route path="/form-submitted" element={<FormSubmittedPage />} />
    </Routes>
    <Footer />
    </BrowserRouter>
  </>
  )
}

export default App;
