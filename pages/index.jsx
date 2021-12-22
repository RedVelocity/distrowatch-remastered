import { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/getPageDetails');
        console.log(data, 'data');
      } catch (error) {
        console.log(error, 'error');
      }
    })();
  }, []);

  return <div>Hi</div>;
};

export default Home;
