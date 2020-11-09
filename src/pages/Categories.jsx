/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import api from '../services/api';
import IconSVG from '../components/Ui/IconSVG';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

const setUpdateDate = (payload) => ({
  type: 'UPDATEDATE', payload,
});

const setCategories = (payload) => ({
  type: 'CATEGORIES', payload,
});

export default function Categories({ history }) {
  const storage = useSelector((store) => store);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  async function getCategories() {
    try {
      dispatch(loading({ loading: true }));
      await api.get('list.php?c=list').then((res) => {
        if (res.status === 200) {
          dispatch(setCategories([
            ...res.data.drinks,
          ]));
          dispatch(setUpdateDate({ updateDate: new Date() }));
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

  useEffect(() => {
    toast.configure();
    const now = moment(new Date());
    const past = moment(storage.updateDate);
    const duration = moment.duration(now.diff(past));

    // Só realiza a consulta se o storage de categorias estiver vazio
    // ou se a data da última requisição for maior que 1 hora
    if (storage.categories.length === 0 || duration.asHours() > 1) {
      getCategories();
    }
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
      <button type="button" className="categories-reload" data-cy="button-reload" onClick={() => getCategories()}>
        <IconSVG
          icon="refresh"
          height="4rem"
          width="4rem"
          fill="#224074"
        />
      </button>
      <div className="categories-search">
        <input
          type="text"
          placeholder="Search"
          data-cy="input-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="categories-container">
        {storage.categories.filter(
          (e) => e.strCategory.toUpperCase().includes(search.toUpperCase()),
        ).map((data, index) => (
          <div className="categories-category" key={index.toString()}>
            <button type="button" data-cy="button-get-drinks" onClick={() => handleSubmit(data.strCategory)}>
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
