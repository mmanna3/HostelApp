import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import 'utils/FontAwesomeLibrary';
import HuespedesPage from 'pantallas/huespedes/Page';
import ReservasPage from 'pantallas/reservas/Page';
import HabitacionesPage from 'pantallas/habitaciones/Page';
import LoginPage from 'pantallas/login/Page';
import Navbar from 'components/navbar/Navbar';
import { siEstaLogueadoEnviarTokenEnTodosLosRequests, estaLogueado } from 'pantallas/login/servicio';

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
      </div>
    );
};

export default App;
