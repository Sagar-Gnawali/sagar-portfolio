import { lazy, Suspense } from "react";
import { HashRouter } from "react-router-dom";
import Footer from "@components/footer";
import Navigation from "./apps/navigation/nagivation";
import NavRouter from "./apps/routes";
import { ThemeProvider } from "./theme/ThemeProvider";
import "./App.css";

const LiquidCanvas = lazy(() => import("@components/liquid-canvas"));

function App() {
  return (
    <ThemeProvider>
      <HashRouter>
        <Suspense
          fallback={<div className="liquid-fallback" aria-hidden="true" />}
        >
          <LiquidCanvas />
        </Suspense>
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
