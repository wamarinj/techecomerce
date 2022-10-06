import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup, Carousel, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice';

const ProductsDetail = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    const productsList = useSelector(state => state.products);
    const [ shop, setShop ] = useState(1);

    const productsDetail = productsList.find(products => products.id === Number(id))

    const relatedProducts = productsList.filter(products =>
        products.category.id === productsDetail.category.id)

    // console.log(relatedProducts)

    useEffect(() =>{
        setShop(1)
    }, [id])

    const addCart = () => {
        // alert("shop: " +shop)
        const shopProduct = {
            id: id,
            quantity: shop
        }
        dispatch(addCartThunk(shopProduct))
    }

    return (
        <Row>
            <Col>
                <Card style={{ width: '35rem' , marginLeft: "2rem"}}           
                >
                    <Card.Header><b>{productsDetail?.title}</b></Card.Header>
                    
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={productsDetail?.productImgs[0]}
                                alt="First slide"
                                width="60px"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={productsDetail?.productImgs[1]}
                                alt="Second slide"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={productsDetail?.productImgs[2]}
                                alt="Third slide"
                            />
                        </Carousel.Item>
                    </Carousel>
                    <Card.Body>
                        <Card.Text>
                            {productsDetail?.description}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>Price: $ {productsDetail?.price}</ListGroup.Item>
                        <ListGroup.Item>Status:  {productsDetail?.status}</ListGroup.Item>
                        <ListGroup.Item>Category: {productsDetail?.category.name}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        
                            <Button className="me-3" onClick={() => setShop(shop-1)}>-</Button>
                            {shop} 
                            <Button className="me-3" onClick={() => setShop(shop+1)}>+</Button>
                            
                            <Button onClick={addCart}> Add to Cart</Button>
                            
                    </Card.Body>
                </Card>
            </Col>

            <Col lg={4}>
                <ul>
                    <h4>Releated Products</h4>
                    {
                        relatedProducts.map(products => (
                            <ul key={products.id}>
                                <Card border="secondary" style={{ width: '12rem' }}>
                                    <Card.Header><Link to={`/products/${products.id}`}>
                                        {products.title} <br /></Link></Card.Header>
                                    <Card.Body>
                                        <Card.Title></Card.Title>
                                        <Card.Text>
                                            <img src={products.productImgs[0]} width="90px" alt="" />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </ul>
                        ))
                    }
                </ul>
            </Col>

        </Row>


    );
};

export default ProductsDetail;

