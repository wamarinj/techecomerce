import React, { useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPurchasesThunk } from '../store/slices/purchases.slice';


const Purchases = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases)
    
    useEffect(() =>{
        dispatch(getPurchasesThunk());
    }, [])

    return (
        <div >
            <h1>Purchases List</h1>
            <div className='purchasesList'>
            {
                purchases.map(item => (
                    item.cart.products.map((product) => (
                        <Card border="info" key={product.id} style={{ width: '19rem', margin:'10px' }}>
                            <Card.Header>Articule: {product.title} </Card.Header>
                            <Card.Body>
                                <Card.Text>Price: {product.price}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))
                ))
            }
            </div>
        </div>
    );
};

export default Purchases;