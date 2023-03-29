import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as pages from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/landing" element={<pages.Landing />} />
        <Route path="/" element={<pages.Dashboard />} />
        <Route path="/register" element={<pages.Register />} />
        <Route path="*" element={<pages.Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
