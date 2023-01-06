import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import useMarvelService from "../../services/MarvelService";
import AppBanner from "../appBanner/AppBanner";
import setContent from "../../utils/setContent";

const SinglePage = (props) => {
  const {Component, dataType} = props;
  const [data, setData] = useState([]);
  const {id} = useParams();
  const {getCharacter, getComics, clearError, process, setProcess} = useMarvelService();

  useEffect(() => {
    updateData();
  }, [id]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case 'comics':
        getComics(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        break;
      case 'character':
        getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
        break;
    }
  }

  const onDataLoaded = (data) => {
    setData(data);
  }


  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
}

export default SinglePage;
