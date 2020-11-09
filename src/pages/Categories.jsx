/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import IconSVG from '../components/Ui/IconSVG';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

export default function Categories({ history }) {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    toast.configure();
    async function getCategories() {
      try {
        dispatch(loading({ loading: true }));
        await api.get('list.php?c=list').then((res) => {
          if (res.status === 200) {
            setCategories(res.data.drinks);
          }
        }).catch((error) => {
          toast.error(`Falha na requisição: ${error}`);
          console.log(error);
        }).finally(() => {
          dispatch(loading({ loading: false }));
        });
      } catch (error) {
        toast.error(`Falha na requisição: ${error}`);
      }
    }

    getCategories();
  }, []);

  function handleSubmit(category) {
    history.push({
      pathname: '/drinks',
      search: `?query=${category}`,
    });
  }

  return (
    <div className="categories">
      <h1>Categories</h1>
      <div className="categories-container">
        {categories.map((data, index) => (
          <div className="categories-category" key={index.toString()}>
            <button type="button" onClick={() => handleSubmit(data.strCategory)}>
              <IconSVG
                icon="search"
                height="3rem"
                width="3rem"
                fill="#00BEE9"
              />
              {data.strCategory}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
