import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from 'store/api/api';
import { PasajeroDTO } from 'store/api/DTOs';
import { useCounterKey } from 'utils/hooks/useCounterKey';

export const useDatosDelPasajero = (): any => {
  const [pasajeroKey, reiniciarDatosDelPasajero] = useCounterKey(1000);
  const { datos: pasajero } = useSelector(api.pasajeros.obtenerPorDniOPasaporte.selector);
  const dispatch = useDispatch();

  const mostrarToastOK = (pasajero: PasajeroDTO): void => {
    toast('El huésped está registrado. De ser necesario, podés editar sus datos.', {
      type: toast.TYPE.SUCCESS,
      toastId: `toast-exito-${pasajero.dniOPasaporte}`,
    });
  };

  const mostrarToastError = (): void => {
    dispatch(api.pasajeros.obtenerPorDniOPasaporte.reiniciar());
    toast('El huésped no está registrado. Llená sus datos para registrarlo.', {
      type: toast.TYPE.ERROR,
      toastId: `toast-error`,
    });
  };

  const buscarDniOPasaporte = (dniOPasaporte: string): void => {
    reiniciarDatosDelPasajero();
    dispatch(api.pasajeros.obtenerPorDniOPasaporte.invocar({ dniOPasaporte }, mostrarToastOK, mostrarToastError));
  };

  return [pasajeroKey, pasajero, buscarDniOPasaporte];
};
