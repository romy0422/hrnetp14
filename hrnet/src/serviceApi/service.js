import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://romy0422.github.io/hrnetp14/datas/datas.json');
    return response.data; 
  } catch (error) {
    throw error;
  }
};
