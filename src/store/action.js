// action : là 1 {} hay hà return {}
// {} gồm {type, data(tham số)}

export const addTask = (task) => {
  return {
    type: "add",
    payload: task,
  };
};

export const deleteTask = (task) => {
  return {
    type: "delete",
    payload: task,
  };
};
