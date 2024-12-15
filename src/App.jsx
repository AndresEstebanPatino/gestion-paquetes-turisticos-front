import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Usuarios from "./pages/Usuarios";
import Destinos from "./pages/Destinos";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App(){
  return(
<Router>
  <Header />
  <main>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usuarios" element={<Usuarios />} />
      <Route path="/destinos" element={<Destinos />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </main>
  <Footer />
</Router>
  )
}

export default App;