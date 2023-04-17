import React, { useState } from "react";

const ListContext = React.createContext({
  listItems: [],
  addListItem: (item) => {},
  removeListItem: (item) => {},
});

export const ListProvider = (props) => {
  const [item, setItem] = useState([]);
  const addListItemHandler = (item) => {
    setItem((prevItem) => {
      const updatedItem = prevItem.concat(item);
      return updatedItem;
    });
  };
  const removeListItemHandler = () => {};
  const listContext = {
    listItems: item,
    addListItem: addListItemHandler,
    removeListItem: removeListItemHandler,
  };
  return <ListContext.Provider value={listContext}>
    {props.children}
  </ListContext.Provider>;
};

export default ListContext;
