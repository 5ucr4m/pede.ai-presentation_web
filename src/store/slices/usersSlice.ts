import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

interface UsersState {
  connectedUsers: User[];
}

const initialState: UsersState = {
  connectedUsers: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userConnected: (state, action: PayloadAction<User>) => {
      if (!state.connectedUsers.find(user => user.id === action.payload.id)) {
        state.connectedUsers.push(action.payload);
      }
    },
  },
});

export const { userConnected } = usersSlice.actions;

export default usersSlice.reducer;
