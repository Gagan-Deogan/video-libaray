export const initial = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_SAVE":
      return state.concat([action.payload]);
    case "REMOVE_FROM_SAVE":
      return state.filter((video) => video._id !== action.payload);
    default:
      return state;
  }
};
