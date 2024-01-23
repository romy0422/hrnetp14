
import { useMemo, useState, useEffect } from 'react';
import Table from '../modules/Table';
import { fetchData } from '../serviceApi/service';

const List = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
      const getData = async () => {
        try {
          const fetchedData = await fetchData();
          setData(fetchedData);
        } catch (error) {
          setError('Erreur lors de la récupération des données');
          console.error(error);
        }
      };
  
      getData();
    }, []);

    const columns = useMemo(
        () => [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Start Date',
            accessor: 'startDate',
          },
          {
            Header: 'Department',
            accessor: 'department',
          },
          {
            Header: 'Date of Birth',
            accessor: 'dateOfBirth',
          },
          {
            Header: 'Street',
            accessor: 'street',
          },
          {
            Header: 'City',
            accessor: 'city',
          },
          {
            Header: 'State',
            accessor: 'state',
          },
          {
            Header: 'Zip Code',
            accessor: 'zipCode',
          },
        ],
        []
      );
    
      const dataArray = useMemo(
        () => data,
        [data]
      );

return(
<>

<Table columns={columns} data={dataArray} />

</>

)




}


export default List;