
import { useMemo, useState, useEffect } from 'react';
import Table from '../modules/Table';
import { fetchData } from '../serviceApi/service';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setError } from '../reduxCode/dataSlice';
const List = () => {
    const data = useSelector((state) => state.data.items);
    const errorMessage = useSelector((state) => state.data.error);
  
    const dispatch = useDispatch();
    useEffect(() => {
      const getData = async () => {
        try {
          const fetchedData = await fetchData();
          dispatch(setData(fetchedData));
        } catch (error) {
          dispatch(setError('Erreur lors de la récupération des données'));
          console.log(errorMessage);
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