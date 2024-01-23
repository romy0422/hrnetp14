import { useTable, usePagination, useGlobalFilter } from 'react-table';
import styled from 'styled-components';


const Styles = styled.div`
  padding: 1rem;
  z-index:5;
  table {
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;

    tr:nth-child(odd) {
      background-color: #fff;
    }
    tr:nth-child(even) {
      background-color: #d2fdb3;
    }
    tr:hover{
      background-color: #feeb67
    }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      :last-child {
        border-right: 0;
      }
    }
  }
`;

const HeaderTable = styled.div`
 width:100%;
 display:flex;
 justify-content: space-between;
`;

const FooterTable= styled.div`
with:100%;
display:flex;
justify-content: space-between;
`



const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  
      
  const firstRowOnPage = pageIndex * pageSize + 1;
  const lastRowOnPage = pageIndex * pageSize + page.length;
  const totalRows = preGlobalFilteredRows.length;

  return (
    <Styles>
       <HeaderTable>
         <select
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100, 200].map(pageSize => (
            <option key={pageSize} value={pageSize}>
               {pageSize}
            </option>
          ))}
        </select>
        <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      </HeaderTable>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
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
      </table>
      <FooterTable>
      <span>
       {firstRowOnPage} to {lastRowOnPage} of {totalRows} total
    </span>
        <Pagination
  pageIndex={pageIndex}
  pageCount={pageCount}
  gotoPage={gotoPage}
  canPreviousPage={canPreviousPage}
  previousPage={previousPage}
  canNextPage={canNextPage}
  nextPage={nextPage}
/>
      </FooterTable>
    </Styles>
  );
};

export default Table;



const Pagination = ({
  pageIndex,
  pageCount,
  gotoPage,
  canPreviousPage,
  previousPage,
  canNextPage,
  nextPage,
}) => {
  let startPage = pageIndex - 2;
  if (startPage <= 0) startPage = 0;
  let endPage = startPage + 4;
  if (endPage >= pageCount) {
    endPage = pageCount - 1;
    startPage = endPage - 4 <= 0 ? 0 : endPage - 4;
  }

  const pages = Array.from({ length: (endPage - startPage) + 1 }, (_, index) => startPage + index);

  return (
    <div>
      <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
        {'<<'}
      </button>{' '}
      <button onClick={() => previousPage()} disabled={!canPreviousPage}>
        {'Previous'}
      </button>{' '}
      {pages.map(page => (
        <button key={page} onClick={() => gotoPage(page)} disabled={pageIndex === page}>
          {page + 1}
        </button>
      ))}
      <button onClick={() => nextPage()} disabled={!canNextPage}>
        {'Next'}
      </button>{' '}
      <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
        {'>>'}
      </button>{' '}
    </div>
  );
};


const GlobalFilter = ({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) => {
  return (
    <span>
      Search:{' '}
      <input
        value={globalFilter || ''}
        onChange={e => setGlobalFilter(e.target.value)}
        placeholder={`${preGlobalFilteredRows.length} enregistrements...`}
      />
    </span>
  );
};
