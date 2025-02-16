import { BrowserRouter } from "react-router-dom";
import Footer from "@components/footer";
import Navigation from "./apps/navigation/nagivation";
import NavRouter from "./apps/routes";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <NavRouter />
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
