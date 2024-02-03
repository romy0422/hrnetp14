import {
  useTable,
  usePagination,
  useGlobalFilter,
  useSortBy,
} from "react-table";
import styled, {css} from "styled-components";

const Styles = styled.div`
  padding: 1rem;
  z-index:5;
  table {
    border-spacing: 0;
    width: 100%;
    border: 1px solid black;
    margin:10px auto;
    tr:nth-child(odd) {
      background-color: #fff;
    }
    tr:nth-child(even) {
      background-color: #d2fdb3;
    }
    tbody tr:hover {
      background-color: #feeb67;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      :last-child {
        border-right: 0;
      }
      thead th:hover {
        background-color: #ffffff !important;
      }
    }
  }
`;

const HeaderTable = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const FooterTable = styled.div`
  with: 100%;
  display: flex;
  justify-content: space-between;
`;

const SortIcon = styled.span`
  flex-direction:column;
  cursor: pointer;
  display: flex;
  gap: 4px;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
  svg {
    fill: currentColor;
  }
`;


const StyledButton = styled.button`
  background: linear-gradient(to bottom, #d2fdb3, #000000);
  opacity: 0.5;
  border: none;
  border-radius: 5px;
  color: black;
  padding: 5px 20px;
  wdth:70px;
  height:50px;
  font-size:1em;
  cursor: pointer;
  margin: 10px 2px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
    color: white;
  }

  ${({ active }) =>
    active &&
    css`
      background: #000;
      opacity: 1;
      color:white;
    `}
`;

const Table = ({ columns, data }) => {
  const svgUp = (color) => (
    <svg width="20" height="10" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 5 L 10 5 L 5 0 Z" fill={color} />
    </svg>
  );

  const svgDown = (color) => (
    <svg width="20" height="10" viewBox="0 0 10 5" xmlns="http://www.w3.org/2000/svg">
      <path d="M 0 0 L 10 0 L 5 5 Z" fill={color} />
    </svg>
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
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
    useSortBy,
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
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 25, 50, 100, 200].map((pageSize) => (
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
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <SortIcon>
                  {column.isSorted
                    ? (column.isSortedDesc
                        ? <>
                            {svgUp("lightgrey")}
                            {svgDown("black")}
                          </>
                        : <>
                            {svgUp("black")}
                            {svgDown("lightgrey")}
                          </>)
                    : <>
                        {svgUp("lightgrey")}
                        {svgDown("lightgrey")}
                      </>
                  }
                </SortIcon>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const cellValue =
                    cell.value instanceof Date
                      ? cell.value.toLocaleDateString()
                      : cell.render("Cell");
                  return <td {...cell.getCellProps()}>{cellValue}</td>;
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

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div>
      <StyledButton onClick={() => gotoPage(0)} disabled={!canPreviousPage}>&laquo;</StyledButton>
      <StyledButton onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</StyledButton>
      {pages.map((page) => (
        <StyledButton
          key={page}
          active={pageIndex === page}
          onClick={() => gotoPage(page)}
        >
          {page + 1}
        </StyledButton>
      ))}
      <StyledButton onClick={() => nextPage()} disabled={!canNextPage}>Next</StyledButton>
      <StyledButton onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>&raquo;</StyledButton>
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
      Search:{" "}
      <input
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder={`${preGlobalFilteredRows.length} elements...`}
      />
    </span>
  );
};
