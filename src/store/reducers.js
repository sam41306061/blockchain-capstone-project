export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVDER_LOADED":
      return {
        ...state, // update to existing state
        connection: action.connection,
      };

    default:
      return state;
  }
};

// function counterReducer(state = { value: 0 }, action) {
//   switch (action.type) {
//     case "counter/incremented":
//       return { value: state.value + 1 };
//     case "counter/decremented":
//       return { value: state.value - 1 };
//     default:
//       return state;
//   }
// }
