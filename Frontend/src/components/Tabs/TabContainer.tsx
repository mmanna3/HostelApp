import React, { createContext, ReactElement, ReactNode, useState } from 'react';

interface IProps {
  children: ReactNode;
}

export interface IValor {
  idSeleccionada: number;
  setIdSeleccionada: (id: number) => void;
  setContenido: (componente: ReactElement) => void;
}

const valorInicial = {
  idSeleccionada: 0,
  setIdSeleccionada: (): void => {},
  setContenido: (): void => {},
};

export const TabsContext = createContext<IValor>(valorInicial);

const TabContainer = ({ children }: IProps): ReactElement => {
  const [state, setState] = useState<number>(0);
  const [contenido, setContenido] = useState<ReactElement>();

  return (
    <>
      <div className="tabs is-boxed">
        <TabsContext.Provider value={{ idSeleccionada: state, setIdSeleccionada: setState, setContenido: setContenido }}>
          <ul>{children}</ul>
        </TabsContext.Provider>
      </div>
      {contenido}
    </>
  );
};

export default TabContainer;
