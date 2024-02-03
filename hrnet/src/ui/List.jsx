import { useMemo, useEffect } from 'react';
import Table from '../modules/Table';
import { fetchData } from '../serviceApi/service';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setError } from '../reduxCode/dataSlice';
import { parse, compareAsc, format, parseISO, isValid } from 'date-fns';

function formatStandard(dateInput) {
    if (dateInput instanceof Date && isValid(dateInput)) {
        return format(dateInput, 'dd/MM/yyyy');
    }
    if (typeof dateInput === 'string') {
        let parsedDate = parseISO(dateInput);
        if (isValid(parsedDate)) {
            return format(parsedDate, 'dd/MM/yyyy');
        }

        const formatsToTry = ['yyyy-MM-dd', 'MM/dd/yyyy', 'dd-MM-yyyy', 'dd/MM/yyyy'];
        for (let formatString of formatsToTry) {
            parsedDate = parse(dateInput, formatString, new Date());
            if (isValid(parsedDate)) {
                return format(parsedDate, 'dd/MM/yyyy');
            }
        }
    }
    return 'N/A';
}

const List = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.data.error);
    const data = useSelector((state) => state.data.items);
    const compareDates = (rowA, rowB, columnId, desc) => {
      const formatString = 'dd/MM/yyyy';

      const dateA = parse(rowA.values[columnId], formatString, new Date());
      const dateB = parse(rowB.values[columnId], formatString, new Date());

      return compareAsc(dateA, dateB);
    };

    useEffect(() => {
      if (data.length === 0) {
        const getData = async () => {
          try {
            const fetchedData = await fetchData();
            dispatch(setData(fetchedData.map(d => ({
              ...d,
              startDate: formatStandard(d.startDate) ? formatStandard(d.startDate) : '',
              dateOfBirth: formatStandard(d.dateOfBirth) ? formatStandard(d.dateOfBirth) : '',
            }))));
          } catch (error) {
            console.error(error);
            dispatch(setError('Erreur lors de la récupération des données'));
          }
        };
        getData();
      }
    }, [dispatch, data.length]);

    const columns = useMemo(() => [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Start Date', accessor: 'startDate', sortType: compareDates, Cell: ({ value }) => formatStandard(value)
      },
        { Header: 'Department', accessor: 'department' },
        { Header: 'Date of Birth', accessor: 'dateOfBirth', sortType: compareDates, Cell: ({ value }) => formatStandard(value)

      },
        { Header: 'Street', accessor: 'street' },
        { Header: 'City', accessor: 'city' },
        { Header: 'State', accessor: 'state.name' },
        { Header: 'Zip Code', accessor: 'zipCode' },
    ], []);

    return (
        <>
            <Table columns={columns} data={data} />
            {errorMessage && <p>Erreur : {errorMessage}</p>}
        </>
    );
}

export default List;
