import Register from "./components/loginAndRegister/Register";
import Login from "./components/loginAndRegister/Login";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import LogRegContainer from "./components/loginAndRegister/LogRegContainer";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="login" replace />} />
        <Route path="/" element={<LogRegContainer />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/home"
          element={
            <>
              <Header />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="*"
          element={<p>No se halló contenido disponible para esta ruta</p>}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
