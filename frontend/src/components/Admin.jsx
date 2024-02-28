import React, { useState, useEffect } from 'react';
import { addProduct, clearData, deleteProduct, updateProduct } from '../features/cartSlice';
import { getData } from '../features/cartSlice';
import { logout } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import "./Admin.css"
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', stock: '', imageUrl: '' });
  const [products, setProducts] = useState([]);
  const [updateFields, setUpdateFields] = useState({});
  const [finalData, setFinalData] = useState({});
  const [isNavigated, setIsNavigated] = useState(false);
  
  // import from redux
  const categories  = useSelector(state =>  state.cart.categories);
  const  showItems = useSelector(state =>  state.cart.showItems);
  const loggedIn = useSelector(state => state.auth.loggedIn);
  const navigate = useNavigate();

  // Getting all products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const actionResult = await dispatch(getData());
        const data = actionResult.payload;
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();

  }, [loggedIn]);
  
  useEffect(() => {
    if (!loggedIn && !isNavigated) {
      console.log(loggedIn)
      setIsNavigated(true);
        navigate('/login');
    }
  }, [loggedIn, isNavigated]);


  useEffect(()=>{
    setProducts(showItems);
  }, [categories])

  const handleUpdateProduct = (productId) => {

    const productToUpdate = products.find(product => product._id === productId);
    setUpdateFields(productToUpdate);
    setFinalData(productToUpdate);
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFinalData(prevState => ({ ...prevState, [name]: value }));
  };


  const handleFinalUpdate = () => {
    const upateAndFetchData = async () => {
      try {
        const reduxUpdate = await dispatch(updateProduct({ id: updateFields._id, finalData }));
        if (reduxUpdate) {
          setUpdateFields({});
          setFinalData({});
          const actionResult = await dispatch(getData());
          const data = actionResult.payload;
          setProducts(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    upateAndFetchData();
  };

  const handleAddProduct = () => {

    const addandFetchData = async () => {
      const result = await dispatch(addProduct(newProduct));
      if (result) {
        setNewProduct({ name: '', category: '', price: '', stock: '', imageUrl: '' });
        const actionResult = await dispatch(getData());
        const data = actionResult.payload;
        setProducts(data);
      }
    }
    addandFetchData()

  };

  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
    setProducts(showItems);
  };

  const handleLogout = async() => {
    console.log("logout")
      dispatch(logout());
      dispatch(clearData())
  };

  const handleCancel = ()=>{
    setUpdateFields({});
  }

  return (
  <div className='main-admin-section'>
    <nav className='admin-navbar'>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} className='admin-logout-btn'>Logout</button>
    </nav>
  
    <div style={{ padding: "1.5rem" }}>
      <div className='admin-dashboard'>
        <div className='admin-all-products'>
          <h3 style={{padding: '1rem 0'}}>Products</h3>
          <div className='admin-products-list'>
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-details">
                  <h3 className="product-title">{product.name}</h3>
                  <p className="product-price">Price: ${product.price}</p>
                  <div style={{ display: 'flex', gap: '.5rem', marginBottom: '.8rem' }}>
                    Color: {product.variants?.map((item,index) => { return <p key={index+1}>{item.color}</p> })}
                  </div>

                  <button 
                    className='update-btn'
                    onClick={() => handleUpdateProduct(product._id)}
                  >Update</button>
                  <button onClick={()=>handleDeleteProduct(product._id)}
                    className='delete-btn'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='admin-add-product'>
          <div>
            <h3>Add New Product</h3>
            <input
              type="text"
              placeholder='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({
                ...newProduct,
                name: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='category'
              value={newProduct.category}
              onChange={(e) => setNewProduct({
                ...newProduct,
                category: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({
                ...newProduct,
                price: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='stock pieces'
              value={newProduct.stock}
              onChange={(e) => setNewProduct({
                ...newProduct,
                stock: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='imageUrl'
              value={newProduct.imageUrl}
              onChange={(e) => setNewProduct({
                ...newProduct,
                imageUrl: e.target.value
              })}
            />
            <input
              type="text"
              placeholder='color'
              value={newProduct.variants?.[0]?.color || ''}
              onChange={(e) => setNewProduct({
                ...newProduct,
                variants: [{ ...newProduct.variants?.[0], color: e.target.value }]
              })}
            />
            <input
              type="text"
              placeholder='size'
              value={newProduct.variants?.[0]?.size || ''}
              onChange={(e) => setNewProduct({
                ...newProduct,
                variants: [{ ...newProduct.variants?.[0], size: e.target.value }]
              })}
            />

            <button onClick={handleAddProduct}>Add Product</button>
          </div>
          <div>
            {
              updateFields && Object.keys(updateFields).length > 0 && (
                <div>
                  
                  <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <p>Edit Card</p>
                    <button className='cancel-btn' onClick={handleCancel}>X</button>
                  </div>

                  <input type="text" placeholder='name' name="name" value={finalData.name || updateFields.name} onChange={onInputChange} />
                  <input type="text" placeholder='category' name="category" value={finalData.category || updateFields.category} onChange={onInputChange} />
                  <input type="text" placeholder='price' name="price" value={finalData.price || updateFields.price} onChange={onInputChange} />
                  <input type="text" placeholder='stock' name="stock" value={finalData.stock || updateFields.stock} onChange={onInputChange} />
                  <input type="text" placeholder='imageUrl' name="imageUrl" value={finalData.imageUrl || updateFields.imageUrl} onChange={onInputChange} />
                  <button onClick={handleFinalUpdate} >Update</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>

    </div>
  );
};

export default AdminDashboard;
