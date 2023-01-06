import {useEffect, useState} from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import View from "./Parts/View";
import useMarvelService from "../../services/MarvelService";

import './charInfo.scss';

const CharInfo = (props) => {

  const {charId} = props;
  const [char, setChar] = useState(null);
  const {loading, error, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const skeleton = char || loading || error ? null : <Skeleton/>;
  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading ? <Spinner/> : null;
  const content = !(loading || error || !char) ? <View char={char}/> : null;

  return (
    <div className="char__info">
      {skeleton || errorMessage || spinner || content}
    </div>
  );
}



export default CharInfo;
