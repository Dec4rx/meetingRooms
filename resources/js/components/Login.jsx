import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const Login = () => {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const onChange = (e) => {
        e.persist();
        setFormValue({ ...formValue, [e.target.name]: e.target.value })//concatenates to the formValue

    }

    const [textError, setTextError] = useState('');
    const [formOk, setFormOk] = useState(true);

    const navigate = useNavigate();

    const handleOnLogin = async (e) => {
        e.preventDefault();  // This stops the form from submitting in the traditional way
        setFormOk(true);
        await axios.post('http://localhost:80/meetingRooms/public/api/login',
            formValue,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => {
                if (response.status == 200) {
                    //Stores the token and user information
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('user', response.data.user);
                    navigate("/");
                }
            })
            .catch(error => {
                setFormOk(false);
                setTextError("Please verify your email and password");
            })
    }


    return (
        <>
            <Container className="w-75">
                <br />
                
                <Card className="m-3 p-3">
                    <Card.Title className="text-center"><h1>Login</h1></Card.Title>
                    {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
                    <hr />
                    <Form onSubmit={handleOnLogin}>
                        
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                title='Wrong email input, email must look like example@domain.com'
                                name='email'
                                type="email"
                                placeholder="Type your Email"
                                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                maxLength={100}
                                required
                                value={formValue.email}
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password </Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
                                placeholder="Type your Password"
                                value={formValue.password}
                                onChange={onChange}
                            />
                        </Form.Group>

                        <div className='d-flex align-items-center'>
                            <Button variant="success" type='submit' className='mx-auto w-50'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default Login;