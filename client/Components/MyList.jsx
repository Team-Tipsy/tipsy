import React from 'react'
import { Link } from 'react-router-dom';

function MyList(props) {
  const { userFavs, userRecipes, title } = props;

  let ListItems, List;
  List = title.includes('Recipes') ? userRecipes : userFavs;

  if (List !== undefined && Array.isArray(List)) {
    ListItems = List.map((element, index) => {
      return <li>{element.name}</li>
    })
  } else if (!Array.isArray(List)) {
    ListItems = <li>{List.name}</li>;
  }


    // if want to get fancy and create hyperlinks to each favorite drink info / each user recipe drink info
    // <li>
    //   <Link to {{
    //   pathname: `/drink/${drinkID}`,
    //     state: {
    //       drinkObj
    //     }
    //   }}></Link>
    // </li>
;

  return (
    <div>
      <h2>{ title }</h2>
      <ul>
        { ListItems }
      </ul>
    </div>
  )
}

export default MyList
