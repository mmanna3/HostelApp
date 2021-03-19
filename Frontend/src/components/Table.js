import React, { useEffect } from 'react';
import { useTable } from 'react-table';
import { EstadosFetchEnum as ESTADO } from 'store/interfaces';

const Table = ({ fetchData, columnas, datos, estado }) => {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const data = React.useMemo(() => datos, [datos]);

  const columns = React.useMemo(() => columnas, [columnas]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  const bodyConDatos = (
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );

  if (estado === ESTADO.huboError) return <p>Hubo un error.</p>;

  return (
    <table {...getTableProps()} className="table is-striped is-hoverable is-bordered is-fullwidth">
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="is-primary">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
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
