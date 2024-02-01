
import { useMemo, useEffect } from 'react';
import Table from '../modules/Table';
import { fetchData } from '../serviceApi/service';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setError } from '../reduxCode/dataSlice';
import { parse, compareAsc } from 'date-fns';

const List = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector((state) => state.data.error);
    const data = useSelector((state) => state.data.items);

    const compareDates = (rowA, rowB, columnId, desc) => {
      const format = 'dd/MM/yyyy';

      const dateA = parse(rowA.values[columnId], format, new Date());
      const dateB = parse(rowB.values[columnId], format, new Date());

      return compareAsc(dateA, dateB);
      };

    useEffect(() => {
      if (data.length === 0) {
        const getData = async () => {
          try {
            const fetchedData = await fetchData();
            dispatch(setData(fetchedData));
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
        { Header: 'Start Date', accessor: 'startDate', sortType: compareDates },
        { Header: 'Department', accessor: 'department' },
        { Header: 'Date of Birth', accessor: 'dateOfBirth', sortType: compareDates},
        { Header: 'Street', accessor: 'street' },
        { Header: 'City', accessor: 'city' },
        { Header: 'State', accessor: 'state' },
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