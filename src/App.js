import { useState } from "react";
import Register from "./components/loginAndRegister/Register";
import Login from "./components/loginAndRegister/Login";
import Footer from "./components/footer/Footer";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/header/Header";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Offcanvas from "react-bootstrap/Offcanvas";

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Outlet />}>
          <Route
            index
            element={
              <>
                <Header />
                <Dashboard />
                <Footer />
              </>
            }
          />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="*"
          element={<p>No se halló contenido disponible para esta ruta</p>}
        />
      </Routes>
      <button className="fixedButton" onClick={handleShow}>
        About
      </button>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Que es babyTracker?</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            Proyecto en proceso de desarrollo. Está desarrollado con React e
            interactúa con una API que fue proporcionada por una materia de la
            facultad que tiene como objetivo capacitar a los alumnos en React.
          </p>
          <p>Usuario de prueba: Qq123</p>
          <p>Password: Qq123</p>
        </Offcanvas.Body>
      </Offcanvas>
    </BrowserRouter>
  );
}
export default App;
