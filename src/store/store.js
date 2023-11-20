import { createStore } from "redux";
import { reducerTasks } from "./reducer";

export const store = createStore(reducerTasks);
