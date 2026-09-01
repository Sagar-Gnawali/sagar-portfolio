import { HashRouter } from "react-router-dom";
import Footer from "@components/footer";
import LiquidCanvas from "@components/liquid-canvas";
import Navigation from "./apps/navigation/nagivation";
import NavRouter from "./apps/routes";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <LiquidCanvas />
        <div className="app-shell">
          <Navigation />
          <main className="flex-1">
            <NavRouter />
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;
