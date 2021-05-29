import React, { ReactElement, useEffect } from 'react';
import { Column, useTable } from 'react-table';
import { EstadosApiRequestEnum as ESTADO, EstadosApiRequestEnum } from 'store/api/utils/estadosApiRequestEnum';

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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

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

  if (estado === ESTADO.huboError) return <p>Hubo un error.</p>;

  return (
    <table {...getTableProps()} className="table is-hoverable is-bordered is-fullwidth">
      <thead>
        {headerGroups.map(
          (headerGroup, i): ReactElement => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map(
                (column, i): ReactElement => (
                  <th {...column.getHeaderProps()} key={i} className="is-primary">
                    {column.render('Header')}
                  </th>
                )
              )}
            </tr>
          )
        )}
      </thead>
      {estado === ESTADO.cargando ? (
        <tbody>
          <tr>
            <td>Cargando...</td>
          </tr>
        </tbody>
      ) : (
        bodyConDatos
      )}
    </table>
  );
};

export default Table;
