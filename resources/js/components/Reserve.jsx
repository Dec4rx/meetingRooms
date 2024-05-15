import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from "react-router-dom";
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';

const Reserve = () => {
    const token = sessionStorage.getItem('token');
    const user_id = sessionStorage.getItem('user');

    let roomData = useParams() // Get the passed id
    const meeting_rooom_id = parseInt(roomData.id)


    const [startDate, setStartDate] = useState(new Date()); // Start time initialization

    const [endDate, setEndDate] = useState(() => new Date(new Date().setHours(new Date().getHours() + 2))); // End time initialization

    //Give the necessary Datetime format
    const formattedStartDate = format(startDate, 'yyyy-MM-dd HH:mm:ss');
    const formattedEndDate = format(endDate, 'yyyy-MM-dd HH:mm:ss');

    const formValue = {
        user_id: parseInt(user_id),
        meeting_room_id: meeting_rooom_id,
        start_time: formattedStartDate,
        end_time: formattedEndDate
    }

    const [textError, setTextError] = useState('');
    const [formOk, setFormOk] = useState(true);

    const navigate = useNavigate();

    const handleOnReserve = async (e) => {
        e.preventDefault();  // This stops the form from submitting in the traditional way
        setFormOk(true);
        await axios.post(`http://localhost:80/meetingRooms/public/api/reservations`,
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
                setFormOk(false);
                setTextError("Remember you can only select an end time with a maximum of 2 hours");
            })
    }


    return (
        <>

            <Container className="w-75">
                <br />

                <Card className="m-3 p-3">
                    <Card.Title className="text-center"><h1>Reserving Meeting Room</h1></Card.Title>
                    {!formOk && (<Alert key='danger' variant='danger'>{textError}</Alert>)}
                    <hr />
                    <Card.Text>
                        <p><b>ID:</b> {roomData.id}</p>
                    </Card.Text>
                    <Form onSubmit={handleOnReserve}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label className="mx-3">Start Time:</Form.Label>
                            <DateTimePicker minDate={new Date()}
                                dateFormat="yyyy-MM-dd HH:mm:ss"
                                timeFormat="HH:mm:ss" onChange={setStartDate} value={startDate} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCapacity">
                            <Form.Label className="mx-3">End Time: </Form.Label>
                            <DateTimePicker minDate={new Date()} dateFormat="yyyy-MM-dd HH:mm:ss"
                                timeFormat="HH:mm:ss" onChange={setEndDate} value={endDate} />
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

export default Reserve;