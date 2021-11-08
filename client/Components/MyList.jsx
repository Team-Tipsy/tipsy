import React from 'react'
import { Link } from 'react-router-dom';

function MyList(props) {
  const { userFavs, userRecipes } = props;

  // const Title = (userFavs.length === 0) ? 'My Recipes' : 'My Favorites';

  // let ListItems, List;
  // List = (userFavs.length === 0) ? userRecipes : userFavs;

  // Fill out logic to create 'ul' element for each recipe/favorite (need db info)
  // Not sure how userRecipes and userFavs are formatted right now - so put in some boilerplate
  // ListItems = List.map(element => {
  //   return <li>{element}</li>

    // if want to get fancy and create hyperlinks to each favorite drink info / each user recipe drink info
    // <li>
    //   <Link to {{
    //   pathname: `/drink/${drinkID}`,
    //     state: {
    //       drinkObj
    //     }
    //   }}></Link>
    // </li>
// });

  return (
    <div>
      {/* <h2>{ Title }</h2> */}
      <h2>Title</h2>
      <ul>
        {/* { ListItems } */}
        <li>list item 1</li>
        <li>list item 2</li>
        <li>list item 3</li>
      </ul>
    </div>
  )
}

export default MyList
