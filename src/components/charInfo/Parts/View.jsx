import ListItem from "./ListItem";

const View = (props) => {

  const {char} = props;
  const {name, description, thumbnail, homepage, wiki, comics} = char;

  const comicsArray = comics.map((item, i) => {
    return (
      <ListItem key={i} item={item} />
    );
  });

  const isEqualsZero = comicsArray.length === 0;
  const isBiggerThanTen = comicsArray.length > 10;
  const ulItemsCondition = isEqualsZero ? 'There are no comics in API' : (isBiggerThanTen ? comicsArray.slice(9, comicsArray.length - 1) : comicsArray);
  const imgStyle = thumbnail.match(/image_not_available/) ? {'objectFit': 'contain'} : {'objectFit': 'cover'};

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name.toLowerCase()} style={imgStyle}/>
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {ulItemsCondition}
      </ul>
    </>
  );
}

export default View;
