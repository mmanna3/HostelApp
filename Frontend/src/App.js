import Navbar from 'components/navbar/Navbar';
import HabitacionesPage from 'pantallas/habitaciones/Page';
import HuespedesPage from 'pantallas/huespedes/Page';
import LoginPage from 'pantallas/login/Page';
import { estaLogueado, siEstaLogueadoEnviarTokenEnTodosLosRequests } from 'pantallas/login/servicio';
import ReservasPage from 'pantallas/reservas/Page';
import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'utils/FontAwesomeLibrary';

const App = () => {
  siEstaLogueadoEnviarTokenEnTodosLosRequests();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route component={AuthRoutes} />
      </Switch>
    </Router>
  );
};

const AuthRoutes = () => {
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
        <Route exact path="/huespedes" component={HuespedesPage} />
        <Route exact path="/reservas" component={ReservasPage} />
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

export default App;
