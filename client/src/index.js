import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./index.css";
import { AppProvider } from "./context/appContext";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <AppProvider>
    <App />
  </AppProvider>
);
