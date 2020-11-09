/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import IconSVG from '../components/Ui/IconSVG';
import Modal from '../components/Ui/Modal';
import { showModal } from '../helpers/functions';

const loading = (payload) => ({
  type: 'LOADER', payload,
});

export default function Drinks({ history }) {
  const dispatch = useDispatch();
  const [drinks, setDrinks] = useState([]);
  const [drinkDetail, setDrinkDetail] = useState({});

  useEffect(() => {
    toast.configure();
    async function getDrinks() {
      try {
        dispatch(loading({ loading: true }));
        const urlParams = new URLSearchParams(history.location.search);
        await api.get(`filter.php?c=${urlParams.get('query')}`).then((res) => {
          if (res.status === 200) {
            setDrinks(res.data.drinks);
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

    getDrinks();
  }, []);

  async function handleSubmit(drink) {
    try {
      dispatch(loading({ loading: true }));
      await api.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`).then((res) => {
        if (res.status === 200) {
          console.log(res.data.drinks[0]);
          setDrinkDetail({
            ...res.data.drinks[0],
          });
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
    showModal('modal-drink-detail');
  }

  return (
    <div className="drinks">
      <Modal
        id="modal-drink-detail"
        header
        textTitle="Detail drink"
        footer
        componentesBody={(
          <>
            <p>Teste</p>
          </>
        )}
        btnInfo
      />
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
              <IconSVG
                icon="search"
                height="3rem"
                width="3rem"
                fill="#00BEE9"
              />
              {data.strDrink}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
