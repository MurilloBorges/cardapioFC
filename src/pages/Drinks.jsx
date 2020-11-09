/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import api from '../services/api';
import IconSVG from '../components/Ui/IconSVG';
import Modal from '../components/Ui/Modal';
import { isNotEmpty, showModal } from '../helpers/functions';

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
        textTitle={`Drink details - ${drinkDetail.strDrink}`}
        footer
        componentesBody={(
          <>
            {isNotEmpty(drinkDetail.strAlcoholic) && <p>{drinkDetail.strAlcoholic}</p>}
            {isNotEmpty(drinkDetail.strCategory) && <p>{drinkDetail.strCategory}</p>}
            {isNotEmpty(drinkDetail.strCreativeCommonsConfirmed)
              && <p>{drinkDetail.strCreativeCommonsConfirmed}</p>}
            {isNotEmpty(drinkDetail.strDrink) && <p>{drinkDetail.strDrink}</p>}
            {isNotEmpty(drinkDetail.strDrinkAlternate) && <p>{drinkDetail.strDrinkAlternate}</p>}
            {isNotEmpty(drinkDetail.strDrinkDE) && <p>{drinkDetail.strDrinkDE}</p>}
            {isNotEmpty(drinkDetail.strDrinkES) && <p>{drinkDetail.strDrinkES}</p>}
            {isNotEmpty(drinkDetail.strDrinkFR) && <p>{drinkDetail.strDrinkFR}</p>}
            {isNotEmpty(drinkDetail.strDrinkZH) && <p>{drinkDetail.strDrinkZHHANS}</p>}
            {isNotEmpty(drinkDetail.strDrinkZH) && <p>{drinkDetail.strDrinkZHHANT}</p>}
            {isNotEmpty(drinkDetail.strGlass) && <p>{drinkDetail.strGlass}</p>}
            {isNotEmpty(drinkDetail.strIBA) && <p>{drinkDetail.strIBA}</p>}
            {isNotEmpty(drinkDetail.strIngredient1) && <p>{drinkDetail.strIngredient1}</p>}
            {isNotEmpty(drinkDetail.strIngredient2) && <p>{drinkDetail.strIngredient2}</p>}
            {isNotEmpty(drinkDetail.strIngredient3) && <p>{drinkDetail.strIngredient3}</p>}
            {isNotEmpty(drinkDetail.strIngredient4) && <p>{drinkDetail.strIngredient4}</p>}
            {isNotEmpty(drinkDetail.strIngredient5) && <p>{drinkDetail.strIngredient5}</p>}
            {isNotEmpty(drinkDetail.strIngredient6) && <p>{drinkDetail.strIngredient6}</p>}
            {isNotEmpty(drinkDetail.strIngredient7) && <p>{drinkDetail.strIngredient7}</p>}
            {isNotEmpty(drinkDetail.strIngredient8) && <p>{drinkDetail.strIngredient8}</p>}
            {isNotEmpty(drinkDetail.strIngredient9) && <p>{drinkDetail.strIngredient9}</p>}
            {isNotEmpty(drinkDetail.strIngredient10) && <p>{drinkDetail.strIngredient10}</p>}
            {isNotEmpty(drinkDetail.strIngredient11) && <p>{drinkDetail.strIngredient11}</p>}
            {isNotEmpty(drinkDetail.strIngredient12) && <p>{drinkDetail.strIngredient12}</p>}
            {isNotEmpty(drinkDetail.strIngredient13) && <p>{drinkDetail.strIngredient13}</p>}
            {isNotEmpty(drinkDetail.strIngredient14) && <p>{drinkDetail.strIngredient14}</p>}
            {isNotEmpty(drinkDetail.strIngredient15) && <p>{drinkDetail.strIngredient15}</p>}
            {isNotEmpty(drinkDetail.strInstructions) && <p>{drinkDetail.strInstructions}</p>}
            {isNotEmpty(drinkDetail.strInstructionsDE) && <p>{drinkDetail.strInstructionsDE}</p>}
            {isNotEmpty(drinkDetail.strInstructionsES) && <p>{drinkDetail.strInstructionsES}</p>}
            {isNotEmpty(drinkDetail.strInstructionsFR) && <p>{drinkDetail.strInstructionsFR}</p>}
            {isNotEmpty(drinkDetail.strInstructionsZH)
              && <p>{drinkDetail.strInstructionsZHHANS}</p>}
            {isNotEmpty(drinkDetail.strInstructionsZH)
              && <p>{drinkDetail.strInstructionsZHHANT}</p>}
            {isNotEmpty(drinkDetail.strMeasure1) && <p>{drinkDetail.strMeasure1}</p>}
            {isNotEmpty(drinkDetail.strMeasure2) && <p>{drinkDetail.strMeasure2}</p>}
            {isNotEmpty(drinkDetail.strMeasure3) && <p>{drinkDetail.strMeasure3}</p>}
            {isNotEmpty(drinkDetail.strMeasure4) && <p>{drinkDetail.strMeasure4}</p>}
            {isNotEmpty(drinkDetail.strMeasure5) && <p>{drinkDetail.strMeasure5}</p>}
            {isNotEmpty(drinkDetail.strMeasure6) && <p>{drinkDetail.strMeasure6}</p>}
            {isNotEmpty(drinkDetail.strMeasure7) && <p>{drinkDetail.strMeasure7}</p>}
            {isNotEmpty(drinkDetail.strMeasure8) && <p>{drinkDetail.strMeasure8}</p>}
            {isNotEmpty(drinkDetail.strMeasure9) && <p>{drinkDetail.strMeasure9}</p>}
            {isNotEmpty(drinkDetail.strMeasure10) && <p>{drinkDetail.strMeasure10}</p>}
            {isNotEmpty(drinkDetail.strMeasure11) && <p>{drinkDetail.strMeasure11}</p>}
            {isNotEmpty(drinkDetail.strMeasure12) && <p>{drinkDetail.strMeasure12}</p>}
            {isNotEmpty(drinkDetail.strMeasure13) && <p>{drinkDetail.strMeasure13}</p>}
            {isNotEmpty(drinkDetail.strMeasure14) && <p>{drinkDetail.strMeasure14}</p>}
            {isNotEmpty(drinkDetail.strMeasure15) && <p>{drinkDetail.strMeasure15}</p>}
            {isNotEmpty(drinkDetail.strTags) && <p>{drinkDetail.strTags}</p>}
            {isNotEmpty(drinkDetail.strVideo) && <p>{drinkDetail.strVideo}</p>}
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
