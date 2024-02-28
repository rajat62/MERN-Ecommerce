import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

API.interceptors.request.use((req)=>{
      if(localStorage.getItem("profile")){
            req.headers.Authorization = `Bearer ${
                  JSON.parse(localStorage.getItem("profile")).token
            }`
      }
      return req;
})

export const getData = createAsyncThunk("cart/getData", async (payload,{ rejectWithValue }) => {
  try {
    const res = await axios.get("http://localhost:5000/api/products");
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})
export const addProduct = createAsyncThunk("cart/addProduct", async (payload,{ rejectWithValue }) => {
  try {

    const res = await API.post("/api/products", payload);
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const updateProduct = createAsyncThunk("cart/updateProduct", async ({id, finalData }, {rejectWithValue})=>{
  try {
    console.log(finalData)
    const res = await API.patch(`/api/products/${id}`, finalData);
    return res.data
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})

export const deleteProduct = createAsyncThunk("cart/deleteProduct", async (id, {rejectWithValue})=>{
  try{
    console.log(id)
    const res = await API.delete(`/api/products/${id}`);
    return res.data;
  }catch(error){
    return rejectWithValue(error.response.data);
  }
})
export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    currentCategory: 'all',
    categories: [],
    showItems: [],
    availableColors: [],
    totalProducts: 0,
    loading: false,
  },
  reducers: {
    getInitialData: (state, action) => {
      console.log(state.items)
      
    },

    updateList: (state, action) => {
      state.currentCategory = action.payload.value;
      let filteredProducts;
      if (action.payload.type === 'category') {
        filteredProducts = state.items.filter(product =>
          product.category.toLowerCase() === action.payload.value.toLowerCase()
        );
      } else {
        filteredProducts = state.items.filter(product =>
          product.variants.some(variant =>
            variant.color &&
            variant.color.toLowerCase() === action.payload.value.toLowerCase()
          )
        );
        
      }
      state.showItems = filteredProducts;
    },

    resetFilters: (state, action) =>{
      state.currentCategory= 'all',
      state.showItems=[];
      state.showItems = [...state.items];
    },

    clearData : (state, action)=>{
      state.items =  [];
      state.currentCategory =  'all';
      state.categories =[];
      state.showItems = [];
      state.availableColors =  [];
      state.totalProducts =0;
    loading
    }

  },
  extraReducers(builder) {
    builder.addCase(
      getData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getData.fulfilled, (state, action) => {
        
        state.items = action.payload;
        
        const uniqueCategories = action.payload.reduce((categories, product) => {
          if (product.category) {
            const categoryIndex = categories.findIndex(cat => cat.name === product.category.toLowerCase());
            if (categoryIndex !== -1) {
              categories[categoryIndex].number++;
            } else {
              categories.push({ name: product.category.toLowerCase(), number: 1 });
            }
          }
          return categories;
        }, []);
    
        const uniqueColors = action.payload.reduce((availableColors, product) => {
          product.variants.forEach(variant => {
            if (variant.color) {
              const colorIndex = availableColors.findIndex(col => col.name === variant.color.toLowerCase());
              if (colorIndex !== -1) {
                availableColors[colorIndex].number++;
              } else {
                availableColors.push({ name: variant.color.toLowerCase(), number: 1 });
              }
            }
          });
          return availableColors;
        }, []);
        
        state.categories = uniqueCategories;
        state.availableColors = uniqueColors;
        state.totalProducts = action.payload.length;
        state.loading = false;
        state.showItems = [];
        state.showItems = action.payload.map(data =>{
          state.showItems.push(data);
          return state.showItems
        })

      })
      .addCase(getData.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(addProduct.pending, (state, action)=>{
        state.loading =true
      })
      .addCase(addProduct.fulfilled, (state, action)=>{
        state.pending =false;
      })
      .addCase(addProduct.rejected, (state, action)=>{
        state.loading = false;
      })
      .addCase(updateProduct.pending, (state, action)=>{
        state.loading =true
      })
      .addCase(updateProduct.fulfilled, (state, action)=>{
        state.pending =false;
        console.log(action.payload);
      })
      .addCase(updateProduct.rejected, (state, action)=>{
        state.loading = false;
      })
      .addCase(deleteProduct.pending, (state, action)=>{
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action)=>{
        state.items = action.payload;
        
        const uniqueCategories = action.payload.reduce((categories, product) => {
          if (product.category) {
            const categoryIndex = categories.findIndex(cat => cat.name === product.category.toLowerCase());
            if (categoryIndex !== -1) {
              categories[categoryIndex].number++;
            } else {
              categories.push({ name: product.category.toLowerCase(), number: 1 });
            }
          }
          return categories;
        }, []);
    
        const uniqueColors = action.payload.reduce((availableColors, product) => {
          product.variants.forEach(variant => {
            if (variant.color) {
              const colorIndex = availableColors.findIndex(col => col.name === variant.color.toLowerCase());
              if (colorIndex !== -1) {
                availableColors[colorIndex].number++;
              } else {
                availableColors.push({ name: variant.color.toLowerCase(), number: 1 });
              }
            }
          });
          return availableColors;
        }, []);
        
        state.categories = uniqueCategories;
        state.availableColors = uniqueColors;
        state.totalProducts = action.payload.length;
        state.loading = false;
        state.showItems = [];
        state.showItems = action.payload.map(data =>{
          state.showItems.push(data);
          return state.showItems
        })
      })
      .addCase(deleteProduct.rejected, (state, action)=>{
        state.loading = false;
      })
     }
});

export const { getInitialData, updateList, resetFilters, clearData } = cartSlice.actions;

export default cartSlice.reducer;
