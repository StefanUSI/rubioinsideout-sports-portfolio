import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Handstands from "./pages/Handstands";
import Freediving from "./pages/Freediving";
import Freeskating from "./pages/Freeskating";
import Snowboarding from "./pages/Snowboarding";
import Surfskating from "./pages/Surfskating";
import Skiing from "./pages/Skiing";
import Highlining from "./pages/Highlining";
import IceSkating from "./pages/IceSkating";
import Calisthenics from "./pages/Calisthenics";
import Pumpfoiling from "./pages/Pumpfoiling";
import Weightlifting from "./pages/Weightlifting";
import Flowarts from "./pages/Flowarts";
import Mountaineering from "./pages/Mountaineering";
import ViaFerrata from "./pages/ViaFerrata";

import SportDetail from "./pages/SportDetail";

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  const hideChrome = [
    "/freediving", 
    "/freeskating", 
    "/snowboarding",
    "/surfskating",
    "/skiing",
    "/highlining",
    "/iceskating",
    "/calisthenics",
    "/pumpfoiling",
    "/weightlifting",
    "/flowarts",
    "/mountaineering",
    "/viaferrata"
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gallery-white flex flex-col">
      {!hideChrome && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/handstands" element={<Handstands />} />
          <Route path="/freediving" element={<Freediving />} />
          <Route path="/freeskating" element={<Freeskating />} />
          <Route path="/snowboarding" element={<Snowboarding />} />
          <Route path="/surfskating" element={<Surfskating />} />
          <Route path="/skiing" element={<Skiing />} />
          <Route path="/highlining" element={<Highlining />} />
          <Route path="/iceskating" element={<IceSkating />} />
          <Route path="/calisthenics" element={<Calisthenics />} />
          <Route path="/pumpfoiling" element={<Pumpfoiling />} />
          <Route path="/weightlifting" element={<Weightlifting />} />
          <Route path="/flowarts" element={<Flowarts />} />
          <Route path="/mountaineering" element={<Mountaineering />} />
          <Route path="/viaferrata" element={<ViaFerrata />} />
        </Routes>
      </main>
      {!hideChrome && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
