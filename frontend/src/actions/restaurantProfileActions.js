import { GET_RESTAURANT, UPDATE_RESTAURANT } from "./types";
import backendServer from "../config";
import axios from "axios";

export const getRestaurant = () => (dispatch) => {
  //   const id = localStorage.getItem("restaurant_id");
  // const data =  await getRestaurant
  // dispatch({
  //     type: GET_RESTAURANT,
  //     payload: data.restaurant
  // })
  // axios.get(`${backendServer}/restaurants/${id}/info`)
  // .then(response => response.data.updatedList)
  // .then(restaurant => dispatch({
  //     type: GET_RESTAURANT,
  //     payload: restaurant
  // }))
  // .catch(error => {
  //     console.log(error)
  // })
};

export const updateRestaurant = (restaurantProfileData) => (dispatch) => {
  axios.defaults.withCredentials = true;
  const id = localStorage.getItem("restaurant_id");
  axios.defaults.headers.common["authorization"] = localStorage.getItem(
    "token"
  );
  axios
    .post(
      `${backendServer}/restaurants/${id}/infoUpdate`,
      restaurantProfileData
    )
    .then((response) => response.data)
    .then((data) => {
      return dispatch({
        type: UPDATE_RESTAURANT,
        payload: data,
      });
    })
    // .then(data => {
    //     axios.post(`${backendServer}/restaurants/${id}/infoUpdate`, restaurantProfileData)
    //     .then(data => {
    //         alert("Profile Updated Successfully!");
    //         return dispatch({
    //             type: UPDATE_RESTAURANT,
    //             payload: data
    //         })
    //     })
    // })
    .catch((error) => {
      console.log(error);
    });
};
