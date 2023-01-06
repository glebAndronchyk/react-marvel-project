import {useState} from "react";
import {useForm} from "react-hook-form";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import CharLink from "./Parts/CharLink";
import SearchError from "./Parts/SearchError";

import './charSearchFrom.scss';

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const {error, clearError, getCharacterByName} = useMarvelService();
  const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: {charName: ""}, mode: 'onChange'});

  const onSubmit = async data => {
    const {charName} = data;

    clearError();
    getCharacterByName(charName)
      .then(onCharLoaded);
  }

  const onCharLoaded = (char) => {
    setChar(char);
  }

  const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;
  const response = !char ? null : char.length > 0 ? <CharLink char={char} /> : <SearchError />

  return (
    <div className="char__search-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          className="char__search-label"
          htmlFor="charName"
        >
          Or find a character by name:
        </label>
        <div className="char__search-wrapper">
          <input
            type="text"
            placeholder='Enter name'
            {...register('charName', {
              required: {value: true},
              minLength: {value: 2},
              maxLength: {value: 30},
              pattern: {value: /^[a-zA-Z0-9\s]*$/},
            })}
          />
          <button
            type='submit'
            className="button button__main"
          >
            Find
          </button>
        </div>
      </form>
      {errors?.charName?.type === 'required' && <div className='char__search-error'>This input is required.</div>}
      {errors?.charName?.type === 'maxLength' && <div className='char__search-error'>Length must be under 30.</div>}
      {errors?.charName?.type === 'minLength' && <div className='char__search-error'>Length must be higher than 2.</div>}
      {errors?.charName?.type === 'pattern' && <div className='char__search-error'>Enter valid symbols.</div>}
      {errorMessage || response}
    </div>
  );
}

export default CharSearchForm;
