import { HashRouter } from "react-router-dom";
import Footer from "@components/footer";
import Navigation from "./apps/navigation/nagivation";
import NavRouter from "./apps/routes";
import "./App.css";

function App() {
  return (
    <>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navigation />
          <NavRouter />
          <Footer />
        </div>
      </HashRouter>
    </>
  );
}

export default App;
