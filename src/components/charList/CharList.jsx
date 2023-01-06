import {useEffect, useState, useRef} from "react";

import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";

import './charList.scss';
import ErrorMessage from "../errorMessage/ErrorMessage";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner/>;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner/>;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage/>;
    default:
      throw new Error('Unexpected process state');
  }
}


const CharList = (props) => {

  const [data, setData] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [dataEnded, setDataEnded] = useState(false);

  const {loading, getCharacters, process, setProcess} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getCharacters(offset)
      .then(onListLoaded)
      .then(() => setProcess('confirmed'))
  }

  const onListLoaded = (newData) => {
    let ended = false;
    if (newData.length < 9) {
      ended = true;
    }

    setData(data => [...data, ...newData]);
    setNewItemLoading(() => false);
    setOffset(offset => offset + 9);
    setDataEnded(() => ended);
  }

  const itemsRefs = useRef([]);

  const focusOnItem = (id) => {
    itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
    itemsRefs.current[id].classList.add('char__item_selected');
    itemsRefs.current[id].focus();
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = {'objectFit': 'cover'};
      if (item.thumbnail.match(/image_not_available/)) {
        imgStyle = {'objectFit': 'unset'};
      }

      return (
        <li
          className='char__item'
          tabIndex={0}
          ref={el => itemsRefs.current[i] = el}
          key={item.id}
          onClick={onCharSelected(item.id, i)}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
          <div className="char__name">{item.name}</div>
        </li>
      )
    });
    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  const onCharSelected = (id, i) => () => {
    props.onCharSelected(id);
    focusOnItem(i);
  }

  return (
    <div className="char__list">
      {setContent(process, () => renderItems(data), newItemLoading)}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{'display': dataEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default CharList;
