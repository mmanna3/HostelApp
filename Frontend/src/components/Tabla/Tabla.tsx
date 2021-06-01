import { Icon } from 'components/Icon';
import React, { ReactElement, useEffect } from 'react';
import { Column, useTable } from 'react-table';
import { EstadosApiRequestEnum as ESTADO, EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';
import Estilos from './Tabla.module.scss';

interface IProps<Data extends object = {}> {
  fetchData: Function;
  columnas: any;
  datos: Data[];
  estado: EstadosApiRequestEnum;
}

const Table = ({ fetchData, columnas, datos, estado }: IProps): ReactElement => {
  useEffect((): void => {
    fetchData();
  }, [fetchData]);

  const data = React.useMemo((): {}[] => datos, [datos]);
  const columns = React.useMemo((): Column<{}>[] => columnas, [columnas]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: columns
        .filter((col: any): any => col.mostrar === false)
        .map((col): any => col.id || col.accessor) as any,
    },
  });

  const bodyConDatos = (
    <tbody {...getTableBodyProps()}>
      {rows.map(
        (row, i): ReactElement => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map(
                (cell, i): ReactElement => {
                  return (
                    <td {...cell.getCellProps()} key={i}>
                      {cell.render('Cell')}
                    </td>
                  );
                }
              )}
            </tr>
          );
        }
      )}
    </tbody>
  );

  const cargando = (
    <tbody>
      <tr>
        <td colSpan={100}>
          <div className={Estilos.animacionCargandoContenedor}>
            <div className={Estilos.animacionCargando}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  );

  const noHayDatos = (
    <tbody>
      <tr>
        <td colSpan={100}>
          <div className={Estilos.mensajeContenedor}>
            <span className="icon-text has-text-primary">
              <Icon faCode="exclamation-triangle" size="lg" />
            </span>
            No se encontraron datos.
          </div>
        </td>
      </tr>
    </tbody>
  );

  const huboUnError = (
    <tbody>
      <tr>
        <td colSpan={100}>
          <div className={Estilos.mensajeContenedor}>
            <span className="icon-text has-text-danger">
              <Icon faCode="exclamation-triangle" size="lg" />
            </span>
            Hubo un error. Por favor, volvé a intentarlo.
          </div>
        </td>
      </tr>
    </tbody>
  );

  return (
    <table {...getTableProps()} className="table is-hoverable is-fullwidth">
      <thead>
        {headerGroups.map(
          (headerGroup, i): ReactElement => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map(
                (column, i): ReactElement => (
                  <th {...column.getHeaderProps()} key={i} className={`is-primary ${Estilos.cabecera}`}>
                    {column.render('Header')}
                  </th>
                )
              )}
            </tr>
          )
        )}
      </thead>
      {estado === ESTADO.huboError
        ? huboUnError
        : estado === ESTADO.cargando
        ? cargando
        : datos.length > 0
        ? bodyConDatos
        : noHayDatos}
    </table>
  );
};

export default Table;
