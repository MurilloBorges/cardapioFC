/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import IconSVG from '../components/Ui/IconSVG';
import { Link } from 'react-router-dom';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

export default function Drinks({ history }) {
  const dispatch = useDispatch();
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    toast.configure();
    async function getDrinks() {
      try {
        const urlParams = new URLSearchParams(history.location.search);
        dispatch(loading({ loading: true }));
        await api.get(`filter.php?c=${urlParams.get('query')}`).then((res) => {
          if (res.status === 200) {
            setDrinks(res.data.drinks);
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

    getDrinks();
  }, []);

  function handleSubmit(category) {
    history.push({
      pathname: '/drinks',
      search: category,
    });
  }

  return (
    <div className="drinks">
      <Link to="/categories" className="drinks-come-back" data-cy="come-back">
        <IconSVG
          icon="rewind"
          height="6rem"
          width="6rem"
          fill="#224074"
        />
      </Link>

      <h1>Drinks</h1>
      <div className="drinks-container">
        {drinks.map((data, index) => (
          <div className="drinks-drink" key={index.toString()}>
            <img src={data.strDrinkThumb} alt={`drink-${index.toString()}`} />
            <button type="button" onClick={() => handleSubmit(data.strDrink)}>
              {data.strDrink}
            </button>
            <IconSVG
              icon="search"
              height="4rem"
              width="4rem"
              fill="#00BEE9"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
