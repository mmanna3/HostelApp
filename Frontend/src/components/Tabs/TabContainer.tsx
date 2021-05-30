import React, { createContext, ReactElement, ReactNode, useState } from 'react';

interface IProps {
  children: ReactNode;
}

export interface IValor {
  idSeleccionada: number;
  seleccionar: (id: number, componente: ReactElement) => void;
}

const valorInicial = {
  idSeleccionada: 0,
  seleccionar: (): void => {},
};

export const TabsContext = createContext<IValor>(valorInicial);

const TabContainer = ({ children }: IProps): ReactElement => {
  const [state, setState] = useState<number>(0);
  const [contenido, setContenido] = useState<ReactElement>();

  const seleccionar = (id: number, componente: ReactElement): void => {
    setState(id);
    setContenido(componente);
  };

  return (
    <>
      <div className="tabs is-boxed">
        <TabsContext.Provider value={{ idSeleccionada: state, seleccionar }}>
          <ul>{children}</ul>
        </TabsContext.Provider>
      </div>
      {contenido}
    </>
  );
};

export default TabContainer;
