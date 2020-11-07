/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { isEmpty } from '../helpers/funcoes';
import IconSVG from '../components/Ui/IconSVG';
import api from '../services/api';
import { login } from '../services/authentication';

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
          console.log(res);
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

  return (
    <div className="categories-container">
      {categories.map((data) => (
        <div className="categories-category">
          <p>{data.strCategory}</p>
        </div>
      ))}
    </div>
  );
}
