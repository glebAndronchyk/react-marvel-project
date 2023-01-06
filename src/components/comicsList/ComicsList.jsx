import {useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ComicsItem from "./Parts/ComicsItem";
import ComicsGrid from "./Parts/ComicsGrid";

import './comicsList.scss';

const ComicsList = () => {

  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const {loading, error, getAllComics} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, [])

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset)
      .then(onComicsListLoaded)
  }

  const onComicsListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }
    setComicsList([...comicsList, ...newComicsList]);
    setNewItemLoading(false);
    setOffset(offset + 8);
    setComicsEnded(ended);
  }

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <ComicsItem item={item} />
      )
    })

    return (
      <ComicsGrid items={items} />
    )
  }

  const items = renderItems(comicsList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !newItemLoading ? <Spinner/> : null;

  return (
    <div className="comics__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        disabled={newItemLoading}
        style={{'display': comicsEnded ? 'none' : 'block'}}
        className="button button__main button__long"
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList;
