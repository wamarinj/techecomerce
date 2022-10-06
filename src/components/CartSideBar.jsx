import React, { useEffect } from 'react';
import { Button, ListGroup, ListGroupItem, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';

const CartSideBar = ( {show, handleClose } ) => {

    const dispatch = useDispatch();

    const cartProducts = useSelector(state => state.cart);

    useEffect(() =>{
        dispatch(getCartThunk());
    }, []);
    return (
        <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>My Cart <i class="bi bi-cart3"></i></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup>
                        {cartProducts.map(cart => (
                            <ListGroup.Item key={cart.id}>
                                <Link to={`/products/${cart?.id}`}>
                                {cart.title}
                                </Link>
                            </ListGroup.Item>
                        ) )}
                    </ListGroup>
                </Offcanvas.Body>
                <Button onClick={() => dispatch(purchaseCartThunk())} 
                variant="primary">
                    Checkout
                    </Button>{' '}
                
            </Offcanvas>
    );
};

export default CartSideBar;