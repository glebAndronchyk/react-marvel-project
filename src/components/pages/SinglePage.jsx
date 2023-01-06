import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import AppBanner from "../appBanner/AppBanner";


const SinglePage = (props) => {
  console.log('render');
  const {Component, dataType} = props;
  const [data, setData] = useState([]);
  const {id} = useParams();
  const {getCharacter, getComics, clearError, loading, error} = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comics':
        getComics(id).then(onDataLoaded);
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded);
        break;
    }
  }

  const onDataLoaded = (data) => {
    setData(data);
  }


  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? <Component data={data} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage || spinner || content}
    </>
  );
}

export default SinglePage;
