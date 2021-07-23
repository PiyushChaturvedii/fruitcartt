import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import Products from './products/Products';
import DetailProduct from './detailProduct/DetailProduct';
import Login from './auth/Login';
import Register from './auth/Register';
import Cart from './cart/Cart';
import NotFound from './utils/not_found/NotFound';
import {GlobalState} from '../../GlobalState';
import CreateProduct from './createProduct/CreateProduct';
import Categories from './categories/Categories';


function Pages() {
    
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    
    return (
        <Switch>
            <Route exact path="/" component={Products} />
            <Route exact path="/detail/:id" component={DetailProduct} />
            <Route path="/login" component={isLogged ? NotFound : Login} />
            <Route path="/register" component={isLogged ? NotFound : Register} />
            <Route path="/category" component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/cart" component={Cart} />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}

export default Pages
