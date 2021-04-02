import { useEffect, useContext } from 'react';
import { DataContext } from '../store/context';
import * as Types from '../store/reducer/types';

const { GET_API_DATA, DATA_LOADED, API_ERROR } = Types;

const useFetch = ({ api, method, url, data = null, config = null }) => {
  const { dispatch } = useContext(DataContext);

  useEffect(() => {
    const fetchData = async () => {
      api[method](url, JSON.parse(config), JSON.parse(data))
        .then((res) => {
          dispatch({
            type: GET_API_DATA,
            payload: res.data,
          });
        })
        .catch((err) => {
          dispatch({
            type: API_ERROR,
            payload: 'An error'
          });
        })
        .finally(() => {
          dispatch({
            type: DATA_LOADED,
          });
        });
    };

    fetchData();
  }, [api, method, url, data, config, dispatch]);
};

export default useFetch;
