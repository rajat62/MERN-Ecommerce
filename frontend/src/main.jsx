import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import AuthReducer from "./features/authSlice";
import App from './App';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: AuthReducer
  },
});

const queryClient = new QueryClient();

ReactDOM.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root')
);
