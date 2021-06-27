export const initialState = {
  isShow: false,
  type: "SUCCESS",
  message: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW_SNAKBAR":
      return {
        isShow: true,
        type: action.payload.type,
        message: action.payload.message,
      };
    case "HIDE_SNAKBAR":
      return {
        ...state,
        isShow: false,
      };
    default:
      return state;
  }
};
