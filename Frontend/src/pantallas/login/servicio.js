import axios from 'axios';

export const actualizarUsuarioEnLocalStorage = usuario => {
  localStorage.setItem('user', JSON.stringify(usuario));
  localStorage.getItem('user'); //Raro, pero necesario. A veces tarda en actualizarlo.
};

export const siEstaLogueadoEnviarTokenEnTodosLosRequests = () => {
  let user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) axios.defaults.headers.common = { Authorization: `Bearer ${user.token}` };
};

export const estaLogueado = () => {
  return localStorage.getItem('user') == null;
};

export const obtenerUsuarioLogueado = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const eliminarUsuarioDeLocalStorage = () => {
  localStorage.removeItem('user');
};
