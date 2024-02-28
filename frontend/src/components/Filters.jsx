import React, {  useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearData, resetFilters, updateList } from '../features/cartSlice';

import "./Filters.css";
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Filters = () => {
    const ulStyle= {
        display:'flex',
        flexDirection: 'column',
        gap: '.6rem'
    };
    
    const categories = useSelector(state => state.cart.categories);
    const availableColors = useSelector(state => state.cart.availableColors);
    const reduxCurrentCategory = useSelector(state => state.cart.currentCategory);
    const [currentCategory, setCurrentCategory] = useState(reduxCurrentCategory);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleCategory = (category) => {
        setCurrentCategory(category);
        console.log(currentCategory);
        dispatch(updateList({value: category, type: 'category' }));
    };
    const handleColor = (color) => {
        dispatch(updateList({value: color, type:'color'}));
    };

    const handleResetFilters = ()=>{
        dispatch(resetFilters());
    }
    const handleLogout = ()=>{
        dispatch(logout());
        dispatch(clearData())
        navigate("/login");
    }

    return (
        <div className='filters-container'>
            <div>
            <h2>Category</h2>
            <ul style={ulStyle}>
                {categories.map(category => (
                    <li 
                        key={category.name}
                        value={category.name}
                        onClick={() => handleCategory(category.name)}
                        className='list'
                    >
                        {`${category.name} (${category.number})`}
                    </li>
                ))}
            </ul>
            </div>
            <div>
            <h2>Filter by color</h2>
            <ul style={ulStyle}>
                {availableColors.map(color => (
                    <li 
                        key={color.name}
                        value={color.name}
                        onClick={() => handleColor(color.name)}
                        className='list'
                    >
                       {`${color.name} (${color.number})`}
                    </li>
                ))}
            </ul>
            <button className='reset-filters' onClick={handleResetFilters}>Reset Filters</button>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
            </div>

        </div>
    );
};

export default Filters;
