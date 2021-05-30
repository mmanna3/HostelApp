import React, { createContext, ReactElement, ReactNode, useState } from 'react';

interface IProps {
  children: ReactNode;
}

export interface IValor {
  idSeleccionada: number;
  setIdSeleccionada: (id: number) => void;
}

const valorInicial = { idSeleccionada: 0, setIdSeleccionada: (id: number): void => {} };

export const TabsContext = createContext<IValor>(valorInicial);

const TabContainer = ({ children }: IProps): ReactElement => {
  const [state, setState] = useState<number>(0);

  return (
    <div className="tabs is-boxed">
      <TabsContext.Provider value={{ idSeleccionada: state, setIdSeleccionada: setState }}>
        <ul>{children}</ul>
      </TabsContext.Provider>
    </div>
  );
};

export default TabContainer;
