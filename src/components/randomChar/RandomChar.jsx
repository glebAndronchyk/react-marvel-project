import {useEffect, useState} from "react";

import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import View from "./Parts/View";
import setContent from "../../utils/setContent";

import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

const RandomChar = () => {
  const [char, setChar] = useState(null);

  const {getCharacter, clearError, process, setProcess} = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  }

  useEffect(() => {
    updateChar();
  }, []);


  return (
    <div className="randomchar">
      {setContent(process, View, char)}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!<br/>
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">
          Or choose another one
        </p>
        <button
          className="button button__main"
          onClick={updateChar}
        >
          <div className="inner">try it</div>
        </button>
        <img src={
          mjolnir
        } alt="mjolnir" className="randomchar__decoration"/>
      </div>
    </div>
  )
}

export default RandomChar;
