const View = ({char}) => {
  if (char === null) {
    return;
  }
  const {name, description, thumbnail, homepage, wiki} = char;

  const imgClassNameBase = 'randomchar__img';
  const imgClassName = !thumbnail.match(/image_not_available/) ? `${imgClassNameBase} ${imgClassNameBase}-cover` : ` ${imgClassNameBase} ${imgClassNameBase}-contain`;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={imgClassName}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default View;
