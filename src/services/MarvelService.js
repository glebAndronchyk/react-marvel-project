import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
  const {request, process, setProcess, clearError} = useHttp();

  const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  const _apiKey = 'apikey=50ae262c03bbf78b0c35caf130f1f33a';
  const _baseCharactersOffset = 210;

  const getCharacters = async (offset = _baseCharactersOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?limit=9&offset=210&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  }

  const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  }

  const getComics = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
  }

  const transformDescription = (desc) => {
    if (desc.length > 200) {
      return desc.substring(0, 200) + '...';
    }

    if (desc.length === 0) {
      return `Description doesn't exist`;
    }

    return desc;
  }

  const _transformCharacter = (char) => {

    return {
      id: char.id,
      name: char.name,
      description: transformDescription(char.description),
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      language: comics.textObjects.language || 'en-us',
      price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
    }
  }

  return {
    process,
    setProcess,
    getCharacters,
    getCharacter,
    getComics,
    getAllComics,
    getCharacterByName,
    clearError
  }
}

export default useMarvelService;
