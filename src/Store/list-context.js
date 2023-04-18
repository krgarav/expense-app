import React, { useEffect, useReducer } from "react";

const ListContext = React.createContext({
  listItems: [],
  addListItem: (item) => {},
  removeListItem: (item) => {},
});

const defaultState = { listItems: [] };
const listReducer = (state, action) => {
  if (action.type === "ADD") {
    let updateItems;
    if (state.listItems.length === 0) {
      updateItems = state.listItems.concat(action.item);
      const postData = async () => {
        const response = await fetch(
          "https://expense-app-e491d-default-rtdb.firebaseio.com/items.json",
          {
            method: "POST",
            body: JSON.stringify({ updateItems }),
            headers: {
              "Content-Text": "application/json",
            },
          }
        );
        const data = await response.json();

        localStorage.setItem("id", data.name);
      };
      postData();
    } else {
      updateItems = state.listItems.concat(action.item);
      const postData = async () => {
        const id = localStorage.getItem("id");
        const response = await fetch(
          "https://expense-app-e491d-default-rtdb.firebaseio.com/items/" +
            id +
            ".json",
          {
            method: "PUT",
            body: JSON.stringify({ updateItems }),
            headers: {
              "Content-Text": "application/json",
            },
          }
        );
        const data = await response.json();
      };
      postData();
    }
    return {
      listItems: updateItems,
    };
  }
  if (action.type === "LOAD") {
    const item = action.item.updateItems;
    return { listItems: item };
  }
  if (action.type === "REMOVE") {
    const updateItems = state.listItems.filter((item) => {
      return item.description !== action.id;
    });

    if (state.listItems.length !== 0) {
      const id = localStorage.getItem("id");
      const response = fetch(
        "https://expense-app-e491d-default-rtdb.firebaseio.com/items/" +
          id +
          ".json",
        {
          method: "PUT",
          body: JSON.stringify({ updateItems }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      const id = localStorage.getItem("id");
      const response = fetch(
        "https://expense-app-e491d-default-rtdb.firebaseio.com/" + id + ".json",
        {
          method: "DELETE",
        }
      );
    }

    return { listItems: updateItems };
  }
  return defaultState;
};
export const ListProvider = (props) => {
  const [listState, dispatchListState] = useReducer(listReducer, defaultState);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await fetch(
          "https://expense-app-e491d-default-rtdb.firebaseio.com/items.json"
        );
        const data = await response.json();
        if (data.error) {
          throw data.error;
        }
        const length = Object.keys(data).length;
        const item = Object.entries(data)[length - 1];
        dispatchListState({ type: "LOAD", item: item[1] });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const addListItemHandler = (item) => {
    dispatchListState({ type: "ADD", item: item });
  };
  const removeListItemHandler = (id) => {
    dispatchListState({ type: "REMOVE", id: id });
  };
  const listContext = {
    listItems: listState.listItems,
    addListItem: addListItemHandler,
    removeListItem: removeListItemHandler,
  };
  return (
    <ListContext.Provider value={listContext}>
      {props.children}
    </ListContext.Provider>
  );
};

export default ListContext;
