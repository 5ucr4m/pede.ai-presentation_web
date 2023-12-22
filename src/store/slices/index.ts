import { combineReducers } from "redux";
import usersSlice from "./usersSlice";

const reducers = combineReducers({
    users: usersSlice,
});


export default reducers;