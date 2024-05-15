import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const Register = () => {
    const [formValue, setFormValue] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const onChange = (e) => {
        e.persist();
        setFormValue({ ...formValue, [e.target.name]: e.target.value })//concatenates to the formValue

    }

    const [textError, setTextError] = useState('');//Text of the error
    const [formOk, setFormOk] = useState(true);//Used if there is an error

    const navigate = useNavigate();

    const handleOnRegister = async (e) => {
        e.preventDefault();  // This stops the form from submitting in the traditional way
        console.log(formValue)
        setFormOk(true);
        await axios.post('http://localhost:80/meetingRooms/public/api/register',
            formValue,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            }
        )
            .then(response => {
                if (response.status == 201) {
                    //Stores the token and user information
                    sessionStorage.setItem('token', response.data.token);
                    sessionStorage.setItem('user', response.data.user);
                    navigate("/");
                    window.location.reload(true);
                }
            })
            .catch(error => {
                setFormOk(false);
                setTextError("Please verify your information");
            })
    }


    return (
        <>
            <Container className="w-75">
                <br />
                
                <Card className="m-3 p-3">
                    <Card.Title className="text-center"><h1>Register</h1></Card.Title>
                    {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
                    <hr />
                    <Form onSubmit={handleOnRegister}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                title='Wrong input'
                                name="name"
                                type="text"
                                maxLength={"100"}
                                pattern="[A-Za-z]{1,100}"
                                placeholder="Type your Name"
                                required
                                value={formValue.name}
                                onChange={onChange}
                            />
                        </Form.Group>

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
                            <Form.Label>Password (Minimum 8 characters, at least one capital letter, at least one number)</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
                                placeholder="Type your Password"
                                value={formValue.password}
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicConfirmationPassword">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                name="password_confirmation"
                                type="password"
                                pattern="^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$"
                                placeholder="Type your Password again"
                                value={formValue.password_confirmation}
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

export default Register;