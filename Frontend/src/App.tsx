import Navbar from 'components/navbar/Navbar';
import HabitacionesPage from 'pantallas/habitaciones/Page';
import LoginPage from 'pantallas/login/Page';
import { estaLogueado, siEstaLogueadoEnviarTokenEnTodosLosRequests } from 'pantallas/login/servicio';
import PantallaOperaciones from 'pantallas/operaciones/PantallaOperaciones';
import PasajerosPage from 'pantallas/pasajeros/Page';
import PantallaReservas from 'pantallas/reservas/PantallaReservas';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'utils/FontAwesomeLibrary';

const App = (): ReactElement => {
  siEstaLogueadoEnviarTokenEnTodosLosRequests();

  const AuthRoutes = (): ReactElement => {
    if (estaLogueado())
      return (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      );
    else
      return (
        <div>
          <Navbar />
          <Route exact path="/habitaciones" component={HabitacionesPage} />
          <Route exact path="/operaciones" component={PantallaOperaciones} />
          <Route exact path="/pasajeros" component={PasajerosPage} />
          <Route exact path="/reservas" component={PantallaReservas} />
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            style={{ zIndex: 9999 }}
          />
        </div>
      );
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route component={AuthRoutes} />
      </Switch>
    </Router>
  );
};

export default App;
