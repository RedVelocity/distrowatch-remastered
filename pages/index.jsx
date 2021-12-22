import { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

const Home = () => {
  const [pageData, setPageData] = useState({});
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('/api/getPageDetails');
        setPageData(data);
        console.log(data, 'data');
      } catch (error) {
        // console.log(error, 'error');
      }
    })();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-stone-100">
      <div className="container max-w-screen-md">
        <h1>{pageData.header?.title}</h1>
        <div className="flex items-center justify-evenly">
          <div className="m-4">
            <Image
              width={96}
              height={96}
              src={`https://distrowatch.com/${pageData.header?.logo}`}
              alt="logo"
            />
          </div>
          <ul className="max-w-[50%] m-2 font-semibold">
            {pageData.header &&
              Object.entries(pageData.header.attributes).map((key, i) => (
                <li key={i}>
                  {key[0]}{' '}
                  <span
                    className={`font-normal ${
                      key[1][0] === 'Active' && 'text-green-500'
                    }`}
                  >
                    {key[1].join(', ')}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <p className="text-secondary">{pageData.header?.description}</p>
      </div>
    </div>
  );
};

export default Home;
