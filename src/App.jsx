import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/jobs/new"
          element={
            <ProtectedRoute>
              <CreateJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute>
              <EditJob />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
