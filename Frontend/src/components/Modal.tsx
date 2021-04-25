import { BotonSalir, SubmitButton } from 'components/botones/botones';
import Form from 'components/Form';
import React, { ReactElement, ReactNode } from 'react';

interface IModalParams {
  children: ReactNode;
  onHide: () => void;
  isVisible: boolean;
  minWidth?: string;
}

export const Modal = ({ children, onHide, isVisible, minWidth = '' }: IModalParams): ReactElement => {
  const visibilidad = new Map<boolean, string>([
    [true, 'is-active'],
    [false, ''],
  ]);

  return (
    <div className={`modal ${visibilidad.get(isVisible)}`}>
      <div className="modal-background" onClick={onHide}></div>
      <div className="modal-card" style={{ minWidth: minWidth }}>
        {children}
      </div>
    </div>
  );
};

interface IModalFormParams extends IModalParams {
  resetOnChanged: number;
  onSubmit: (data: any) => void;
}

export const ModalForm = ({
  children,
  onHide,
  isVisible,
  onSubmit,
  resetOnChanged,
  minWidth = '',
}: IModalFormParams): ReactElement => {
  return (
    <Modal onHide={onHide} isVisible={isVisible} minWidth={minWidth}>
      <Form defaultValues={undefined} onSubmit={onSubmit} resetOnChanged={resetOnChanged}>
        {children}
      </Form>
    </Modal>
  );
};

interface IHeaderParams {
  title: string;
  onHide: () => void;
}

export const Header = ({ title, onHide }: IHeaderParams): ReactElement => {
  return (
    <header className="modal-card-head">
      <p className="modal-card-title">{title}</p>
      <BotonSalir onClick={onHide} />
    </header>
  );
};

interface IFooterParams {
  children: ReactNode;
}

export const Footer = ({ children }: IFooterParams): ReactElement => {
  return (
    <footer className="modal-card-foot">
      <div className="container">
        <div className="buttons is-pulled-right">{children}</div>
      </div>
    </footer>
  );
};

interface IFooterAcceptCancel {
  onCancel: () => void;
  loading: boolean;
}

export const FooterAcceptCancel = ({ onCancel, loading }: IFooterAcceptCancel): ReactElement => {
  return (
    <Footer>
      <button type="button" className="button" onClick={onCancel}>
        Cancelar
      </button>
      <SubmitButton loading={loading} text="Confirmar" />
    </Footer>
  );
};

interface IFooterVolver {
  onClick: () => void;
}

export const FooterVolver = ({ onClick }: IFooterVolver): ReactElement => {
  return (
    <Footer>
      <button type="button" className="button is-primary" onClick={onClick}>
        Volver
      </button>
    </Footer>
  );
};

interface IBody {
  children: ReactNode;
  minHeight?: string;
}

export const Body = ({ children, minHeight = '' }: IBody): ReactElement => {
  return (
    <section className="modal-card-body" style={{ width: 'inherit', minHeight: minHeight, maxHeight: '480px' }}>
      <div className="content">{children}</div>
    </section>
  );
};
