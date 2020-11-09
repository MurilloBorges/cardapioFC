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
  const [search, setSearch] = useState('');

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
          <div style={{ height: '40vh', overflow: 'auto' }}>
            {isNotEmpty(drinkDetail.strAlcoholic) && <p>{`Alcoholic: ${drinkDetail.strAlcoholic}`}</p>}
            {isNotEmpty(drinkDetail.strCategory) && <p>{`Category: ${drinkDetail.strCategory}`}</p>}
            {isNotEmpty(drinkDetail.strCreativeCommonsConfirmed)
              && <p>{`Creative comons confirmed: ${drinkDetail.strCreativeCommonsConfirmed}`}</p>}
            {isNotEmpty(drinkDetail.strDrink) && <p>{`Drink: ${drinkDetail.strDrink}`}</p>}
            {isNotEmpty(drinkDetail.strDrinkAlternate) && <p>{`Drink alternate: ${drinkDetail.strDrinkAlternate}`}</p>}
            {isNotEmpty(drinkDetail.strDrinkDE) && <p>{`Drink DE: ${drinkDetail.strDrinkDE}`}</p>}
            {isNotEmpty(drinkDetail.strDrinkES) && <p>{`Drink ES: ${drinkDetail.strDrinkES}`}</p>}
            {isNotEmpty(drinkDetail.strDrinkFR) && <p>{`Drink FR: ${drinkDetail.strDrinkFR}`}</p>}
            {isNotEmpty(drinkDetail.strDrinkZH) && <p>{`Drink ZH-HANS: ${drinkDetail.strDrinkZHHANS}`}</p>}
            {isNotEmpty(drinkDetail.strDrinkZH) && <p>{`Drink ZH-HANT: ${drinkDetail.strDrinkZHHANT}`}</p>}
            {isNotEmpty(drinkDetail.strGlass) && <p>{`Glass: ${drinkDetail.strGlass}`}</p>}
            {isNotEmpty(drinkDetail.strIBA) && <p>{`IBA: ${drinkDetail.strIBA}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient1) && <p>{`Ingredient 1: ${drinkDetail.strIngredient1}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient2) && <p>{`Ingredient 2: ${drinkDetail.strIngredient2}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient3) && <p>{`Ingredient 3: ${drinkDetail.strIngredient3}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient4) && <p>{`Ingredient 4: ${drinkDetail.strIngredient4}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient5) && <p>{`Ingredient 5: ${drinkDetail.strIngredient5}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient6) && <p>{`Ingredient 6: ${drinkDetail.strIngredient6}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient7) && <p>{`Ingredient 7: ${drinkDetail.strIngredient7}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient8) && <p>{`Ingredient 8: ${drinkDetail.strIngredient8}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient9) && <p>{`Ingredient 9: ${drinkDetail.strIngredient9}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient10) && <p>{`Ingredient 10: ${drinkDetail.strIngredient10}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient11) && <p>{`Ingredient 11: ${drinkDetail.strIngredient11}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient12) && <p>{`Ingredient 12: ${drinkDetail.strIngredient12}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient13) && <p>{`Ingredient 13: ${drinkDetail.strIngredient13}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient14) && <p>{`Ingredient 14: ${drinkDetail.strIngredient14}`}</p>}
            {isNotEmpty(drinkDetail.strIngredient15) && <p>{`Ingredient 15: ${drinkDetail.strIngredient15}`}</p>}
            {isNotEmpty(drinkDetail.strInstructions) && <p>{`Instructions: ${drinkDetail.strInstructions}`}</p>}
            {isNotEmpty(drinkDetail.strInstructionsDE) && <p>{`Instructions DE: ${drinkDetail.strInstructionsDE}`}</p>}
            {isNotEmpty(drinkDetail.strInstructionsES) && <p>{`Instructions ES: ${drinkDetail.strInstructionsES}`}</p>}
            {isNotEmpty(drinkDetail.strInstructionsFR) && <p>{`Instructions FR: ${drinkDetail.strInstructionsFR}`}</p>}
            {isNotEmpty(drinkDetail.strInstructionsZH)
              && <p>{`Instructions ZH-HANS: ${drinkDetail.strInstructionsZHHANS}`}</p>}
            {isNotEmpty(drinkDetail.strInstructionsZH)
              && <p>{`Instructions ZH-HANT ${drinkDetail.strInstructionsZHHANT}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure1) && <p>{`Measure 1: ${drinkDetail.strMeasure1}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure2) && <p>{`Measure 2: ${drinkDetail.strMeasure2}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure3) && <p>{`Measure 3: ${drinkDetail.strMeasure3}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure4) && <p>{`Measure 4: ${drinkDetail.strMeasure4}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure5) && <p>{`Measure 5: ${drinkDetail.strMeasure5}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure6) && <p>{`Measure 6: ${drinkDetail.strMeasure6}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure7) && <p>{`Measure 7: ${drinkDetail.strMeasure7}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure8) && <p>{`Measure 8: ${drinkDetail.strMeasure8}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure9) && <p>{`Measure 9: ${drinkDetail.strMeasure9}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure10) && <p>{`Measure 10: ${drinkDetail.strMeasure10}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure11) && <p>{`Measure 11: ${drinkDetail.strMeasure11}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure12) && <p>{`Measure 12: ${drinkDetail.strMeasure12}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure13) && <p>{`Measure 13: ${drinkDetail.strMeasure13}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure14) && <p>{`Measure 14: ${drinkDetail.strMeasure14}`}</p>}
            {isNotEmpty(drinkDetail.strMeasure15) && <p>{`Measure 15: ${drinkDetail.strMeasure15}`}</p>}
            {isNotEmpty(drinkDetail.strTags) && <p>{`Tags: ${drinkDetail.strTags}`}</p>}
            {isNotEmpty(drinkDetail.strVideo) && <p>{`Video: ${drinkDetail.strVideo}`}</p>}
          </div>
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
      <div className="drinks-search">
        <input
          type="text"
          placeholder="Search"
          data-cy="input-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="drinks-container">
        {drinks.filter(
          (e) => e.strDrink.toUpperCase().includes(search.toUpperCase()),
        ).map((data, index) => (
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
