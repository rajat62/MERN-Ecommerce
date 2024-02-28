import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'

export const register = createAsyncThunk('auth/register', async ({ formData, navigate }, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/register", formData);
    navigate("/")

    return response.data.username
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});


export const login = createAsyncThunk('auth/login', async (
  { username, password, navigate }, { rejectWithValue }) => {
  try {
    const response = await axios.post("http://localhost:5000/api/users/login", { username, password });
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loggedIn: false,
    loading: false,
    error: null,
    isAdmin: false
  },
  reducers: {
    logout: (state, action)=>{
      state.loggedIn = !state.loggedIn;
      state.user = '';
      state.isAdmin = false;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loggedIn = !state.loggedIn;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, state => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user === 'admin'? "admin": 'user';
        state.error = null;
        localStorage.setItem("profile",JSON.stringify({...action.payload}));
        state.isAdmin = action.payload.user === 'admin'
        state.loggedIn = action.payload.user === 'admin' || action.payload.user === 'user'
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout} = authSlice.actions;
export default authSlice.reducer;

