import { BrowserRouter } from "react-router-dom";
import Footer from "./apps/components/footer";
import "./App.css";

import Navigation from "./apps/navigation/nagivation";
import NavRouter from "./apps/routes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <NavRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
