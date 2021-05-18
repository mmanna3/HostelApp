import { BotonSalir, SubmitButton } from 'components/botones/botones';
import Form from 'components/Form';
import React, { ReactElement, ReactNode } from 'react';

interface IModalParams {
  children: ReactNode;
  onHide: () => void;
  isVisible: boolean;
  minWidth?: string;
}

export const ModalCard = ({ children, onHide, isVisible, minWidth = '' }: IModalParams): ReactElement => {
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

export const Modal = ({ children, onHide, isVisible }: IModalParams): ReactElement => {
  const visibilidad = new Map<boolean, string>([
    [true, 'is-active'],
    [false, ''],
  ]);

  return (
    <div className={`modal ${visibilidad.get(isVisible)}`}>
      <div className="modal-background" onClick={onHide}></div>
      {children}
    </div>
  );
};

interface IModalFormParams extends IModalParams {
  onSubmit: (data: any) => void;
}

export const ModalForm = ({ children, onHide, isVisible, onSubmit, minWidth = '' }: IModalFormParams): ReactElement => {
  return (
    <ModalCard onHide={onHide} isVisible={isVisible} minWidth={minWidth}>
      <Form defaultValues={undefined} onSubmit={onSubmit}>
        {children}
      </Form>
    </ModalCard>
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
  acceptDataCy?: string;
}

export const FooterAcceptCancel = ({ onCancel, acceptDataCy, loading }: IFooterAcceptCancel): ReactElement => {
  return (
    <Footer>
      <button type="button" className="button" onClick={onCancel}>
        Cancelar
      </button>
      <SubmitButton dataCy={acceptDataCy} loading={loading} text="Confirmar" />
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

interface ICardBody {
  children: ReactNode;
  minHeight?: string;
}

export const CardBody = ({ children, minHeight = '' }: ICardBody): ReactElement => {
  return (
    <section className="modal-card-body" style={{ width: 'inherit', minHeight: minHeight, maxHeight: '480px' }}>
      <div className="content">{children}</div>
    </section>
  );
};

interface IBody {
  children: ReactNode;
  width?: string;
  minHeight?: string;
}

export const Body = ({ children, width = 'inherit', minHeight = '' }: IBody): ReactElement => {
  return (
    <div className="modal-content" style={{ width: width, minHeight: minHeight, maxHeight: '480px' }}>
      {children}
    </div>
  );
};
