import ReactDOM from "react-dom/client";
import App from "./App";
import "normalize.css";
import "./index.css";
import { AppProvider } from "./context/appContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <AppProvider>
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}>
      <App />
    </GoogleOAuthProvider>
  </AppProvider>
);
