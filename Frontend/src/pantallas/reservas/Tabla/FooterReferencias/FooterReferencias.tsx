import React, { ReactElement } from 'react';
import Estilos from './FooterReferencias.module.scss';

const FooterReferencias = (): ReactElement => {
  return (
    <div className={Estilos.footerReferencias}>
      <p>
        <span>Estados de reserva: </span>
        <span className={Estilos.checkinPendiente}>Check-In Pendiente</span>
        <span className={Estilos.inHouse}>In-House</span>
        <span className={Estilos.hizoCheckout}>Hizo Check-out</span>
      </p>
    </div>
  );
};

export default FooterReferencias;
