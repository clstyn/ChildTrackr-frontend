import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import linkNgrok from '../utils/env';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const LoginUser = createAsyncThunk('user/login', async (user, thunkAPI) => {
  try {
    const response = await axios.post(
      `${linkNgrok}/user/login`,
      {
        username: user.username,
        password: user.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
          // 'ngrok-skip-browser-warning': true
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});
export const LoginChild = createAsyncThunk('child/childlogin', async (child, thunkAPI) => {
  try {
    const response = await axios.post(
      `${linkNgrok}/child/childlogin`,
      {
        username: child.username,
        password: child.password
      },
      {
        headers: {
          'Content-Type': 'application/json'
          // 'ngrok-skip-browser-warning': true
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

// export const getMe = createAsyncThunk('user/getMe', async (_, thunkAPI) => {
//   try {
//     const response = await axios.get('http://localhost:5000/me');
//     return response.data;
//   } catch (error) {
//     if (error.response) {
//       const message = error.response.data.msg;
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// });

export const Logout = createAsyncThunk('user/Logout', async () => {
  await axios.delete('http://localhost:5000/logout');
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    builder.addCase(LoginChild.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginChild.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginChild.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get User Login
    // builder.addCase(getMe.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(getMe.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.user = action.payload;
    // });
    // builder.addCase(getMe.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
