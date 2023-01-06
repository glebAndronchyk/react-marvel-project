const ListItem = (props) => {

  const {item} = props;

  return (
    <li className="char__comics-item">
      {item.name}
    </li>
  );
}

export default ListItem;
