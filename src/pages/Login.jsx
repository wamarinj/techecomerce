import axios from 'axios';
import React from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate();
    
    const submit = (data) => {
        // console.log(data);
        axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/users/login/", data)
            .then( res => {
                localStorage.setItem("token", res.data.data.token);
                navigate("/")
                console.log(res.data);
                alert("usuario loggeado")
            })
            .catch(error => {
                if(error.response?.status === 404){
                    
                    alert("Credenciales Invalidas")
                }
                console.log(error.response)
            });
    }

    return (
        <div>
            <h1>LOGIN</h1>
            <Form onSubmit={handleSubmit(submit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control {...register("email")} type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...register("password")} type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <Card className="text-center">
      <Card.Header>TEST DATA</Card.Header>
      <Card.Body>
        <Card.Title>User: user@user.com</Card.Title>
        <Card.Text>
          Password: user1234
        </Card.Text>
      </Card.Body>
    </Card>
        </div>
    );
};

export default Login;