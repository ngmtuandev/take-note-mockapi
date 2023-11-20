const initialState = {
  tasks: [],
};

// reducer là 1 function trả về {} - newState

const reducerTasks = (state = initialState, action) => {
  switch (action.type) {
    case "add":
      console.log(action.payload);
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case "delete":
      return {
        tasks: state.tasks.filter((el) => el !== action.payload),
      };

    default:
      return state;
  }
};

export default reducerTasks;
