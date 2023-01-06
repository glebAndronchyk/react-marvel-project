import {useEffect, useState} from "react";

import setContent from "../../utils/setContent";
import View from "./Parts/View";
import useMarvelService from "../../services/MarvelService";

import './charInfo.scss';

const CharInfo = (props) => {

  const {charId} = props;
  const [char, setChar] = useState(null);
  const {getCharacter, clearError, process, setProcess} = useMarvelService();

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
      .then(() => setProcess('confirmed'));
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }


  return (
    <div className="char__info">
      {setContent(process, View, char)}
    </div>
  );
}



export default CharInfo;
