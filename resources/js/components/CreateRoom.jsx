import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { useState } from 'react';


const CreateRoom = () => {
    const [formValue, setFormValue] = useState({
        name: '',
        capacity: 0
    })

    const onChange = (e) => {
        e.persist();
        setFormValue({ ...formValue, [e.target.name]: e.target.value })//concatenates to the formValue

    }

    const token = sessionStorage.getItem('token');

    const [textError, setTextError] = useState('');
    const [formOk, setFormOk] = useState(true);

    const navigate = useNavigate();

    const handleOnCreateRoom = async (e) => {
        e.preventDefault();  // This stops the form from submitting in the traditional way
        setFormOk(true);
        await axios.post('http://localhost:80/meetingRooms/public/api/meeting_rooms_post',
            formValue,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                if (response.status == 201) {
                    navigate("/");
                }
            })
            .catch(error => {
                console.log(error)
                setFormOk(false);
                setTextError("Please verify the data");
            })
    }


    return (
        <>
            <Container className="w-75">
                <br />

                <Card className="m-3 p-3">
                    <Card.Title className="text-center"><h1>Create Meeting Room</h1></Card.Title>
                    {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
                    <hr />
                    <Form onSubmit={handleOnCreateRoom}>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                title='Wrong input'
                                name="name"
                                type="text"
                                maxLength={"100"}
                                placeholder="Type the Room Name"
                                required
                                value={formValue.name}
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCapacity">
                            <Form.Label>Capacity</Form.Label>
                            <Form.Control
                                title='Enter numeric value'
                                name="capacity"
                                type="number"  
                                placeholder="Enter Capacity"
                                required
                                value={formValue.capacity}
                                onChange={onChange}
                                min="1"  
                                max="100"  
                            />
                        </Form.Group>


                        <div className='d-flex align-items-center'>
                            <Button variant="success"type='submit' className='mx-auto w-50'>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Card>
            </Container>
        </>
    );
}

export default CreateRoom;