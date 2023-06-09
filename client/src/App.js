import { BrowserRouter, Routes, Route } from "react-router-dom";
import * as pages from "./pages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <pages.ProtectedRoute>
              <pages.SharedLayout />
            </pages.ProtectedRoute>
          }
        >
          <Route index element={<pages.ShowStatusComponent />} />{" "}
          <Route path="add-job" element={<pages.AddJob />} />{" "}
          <Route path="all-jobs" element={<pages.AllJobs />} />{" "}
          <Route path="profile" element={<pages.Profile />} />
        </Route>
        <Route path="/landing" element={<pages.Landing />} />
        <Route path="/register" element={<pages.Register />} />
        <Route path="send-email" element={<pages.EmailComponent />} />
        <Route path="reset-password" element={<pages.ResetPassword />} />
        <Route path="reset-password/:token" element={<pages.NewPassword />} />

        <Route path="*" element={<pages.Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
