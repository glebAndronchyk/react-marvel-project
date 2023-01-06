import {Link} from "react-router-dom";

import '../charSearchFrom.scss'
const CharLink = ({char}) => {
  return(
    <div className="char__search-wrapper">
      <div className="char__search-success">There is! Visit {char[0].name} page?</div>
      <Link to={`/characters/${char[0].id}`} className="button button__secondary">
        <div className="inner">To page</div>
      </Link>
    </div>
  );
}

export default CharLink;
