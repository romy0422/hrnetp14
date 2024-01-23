import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('/datas/datas.json');
    return response.data; 
  } catch (error) {
    throw error;
  }
};
