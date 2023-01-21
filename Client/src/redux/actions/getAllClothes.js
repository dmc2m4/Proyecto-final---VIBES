import types from "./types";
// export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";

export function getAllClothes() {
  return function (dispatch) {
    return fetch(`http://localhost:3001/product`)
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: types.GET_ALL_CLOTHES,
          payload: data,
        });
      });
  };
}