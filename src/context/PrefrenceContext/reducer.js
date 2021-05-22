export const initial = [];

export const reducer = (state, action) => {
  switch (action.type) {
    case "LIKE": {
      const selectedPrefrence = state.find(
        (prefrence) => prefrence.video._id === action.payload.video._id
      );
      if (!!selectedPrefrence) {
        return state.map((prefrence) =>
          prefrence.video._id === selectedPrefrence.video._id
            ? { ...prefrence, feels: "LIKE" }
            : prefrence
        );
      } else {
        return state.concat({ video: action.payload.video, feels: "LIKE" });
      }
    }
    case "DISLIKE": {
      const selectedPrefrence = state.find(
        (prefrence) => prefrence.video._id === action.payload.video._id
      );
      if (!!selectedPrefrence) {
        return state.map((prefrence) =>
          prefrence.video._id === selectedPrefrence.video._id
            ? { ...prefrence, feels: "DISLIKE" }
            : prefrence
        );
      } else {
        return state.concat({ video: action.payload.video, feels: "DISLIKE" });
      }
    }
    case "REMOVE":
      return state.filter(
        (prefrence) => prefrence.video._id !== action.payload.video._id
      );
    default:
      return state;
  }
};
