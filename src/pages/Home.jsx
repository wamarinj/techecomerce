import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, InputGroup, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    
    const navigate = useNavigate();
    const productsList = useSelector(state => state.products);
    const [ categories, setCategories] = useState([]);
    const [ productsFiltered, setProductsFiltered] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() => {
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/")
            .then(res => setCategories(res.data.data.categories));
    }, [])

    useEffect(() => {
        setProductsFiltered(productsList);
    }, [productsList])

    const filterCategory = (categoryId) => {
        const filtered = productsList.filter(products =>
            products.category.id === categoryId
        )
        setProductsFiltered(filtered);
    };

    const searchProducts = () => {
        const filtered = productsList.filter(
            products => products.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        setProductsFiltered(filtered)
    };

    return (
        <div>
            <h2>Welcome</h2>
            <div className='button_home'>
            {
                categories.map(category => (
                    <Button key={category.id} onClick={() => filterCategory(category.id)}>
                        {category.name}
                    </Button>
                ))
            }
            </div>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search by name"
                    onChange={e => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Button variant="outline-secondary" onClick={searchProducts}>
                    Search
                </Button>
            </InputGroup>
            <ul className='ProductsInit'>
                {productsFiltered.map(products => (
                    <ul key={products.id} 
                    onClick={() => 
                    navigate(`/products/${products.id}`)}
                    style={{cursor: "pointer", }}
                    >
                        <Card border="primary" style={{ width: '18rem', marginTop:'2rem'}}>
                            <Card.Header>{products.title}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <div className='img-product'>
                                    <img src={products.productImgs?.[0]} alt="" />
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </ul>
                ))}
            </ul>
        </div>
    );
};

export default Home;