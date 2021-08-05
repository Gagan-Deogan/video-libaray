export const initialState = {
  isShow: false,
  type: "SUCCESS",
  message: "",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        isShow: true,
        type: "ERROR",
        message: action.payload,
      };
    case "SUCCESS":
      return {
        isShow: true,
        type: "SUCCESS",
        message: action.payload,
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
