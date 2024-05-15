import { useState, useEffect } from "react";
import { MdEventAvailable, MdNewReleases } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import { FaTrashAlt } from "react-icons/fa";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';
import { Link } from "react-router-dom";

const Main = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    //Fetch Meeting Rooms
    const [meetingRooms, setmeetingRooms] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:80/meetingRooms/public/api/meeting_rooms_list`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json'
                }
            })
            .then(res => {
                setmeetingRooms(res.data)
            })
    }, [])

    //Release a MeetingRoom
    const handleOnRelease = async (roomId) => {
        await axios.put(`http://localhost:80/meetingRooms/public/api/reservations/${roomId}/release`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                if (response.status == 200) {
                    window.location.reload(true);
                }
            })
    }

    //Delete a MeetingRoom
    const handleOnDelete = async (roomId) => {
        await axios.delete(`http://localhost:80/meetingRooms/public/api/meeting_rooms/${roomId}/delete`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
            .then(response => {
                if (response.status == 200) {
                    window.location.reload(true);
                }
            })
    }

    return (

        <Container>
            <Card.Title className="text-center my-2"><h1>Meeting Rooms</h1></Card.Title>
            <hr />

            <Container>
                <Row xs={1} md={2} lg={3} className="g-4">
                    {meetingRooms.map(item => (
                        <Col key={item.id}>
                            <Card className="h-100">
                                <Card.Body>
                                    <Card.Title><h3>{item.name}</h3></Card.Title>
                                    <Card.Text>
                                        <p><b>ID:</b> {item.id}</p>
                                        <p><b>Capacity:</b> {item.capacity}</p>
                                        <p><b>Available:</b> {item.is_occupied ? "No" : "Yes"}</p>
                                        <p><b>Available Until:</b> {item.occupied_until || "N/A"}</p>
                                    </Card.Text>
                                    {!item.is_occupied && token && (//TODO 
                                        <Button variant='outline-success' as={Link}
                                            to={`/reserve/${item.id}`}>
                                            Reserve <MdEventAvailable />
                                        </Button>
                                    )}
                                    {token && user_id == item.user_id && (
                                        <Button variant='outline-info' onClick={() => handleOnRelease(item.id)}>
                                            Release <MdNewReleases />
                                        </Button>
                                    )}


                                    {token && (
                                        <>
                                            <Button variant='outline-danger' onClick={() => handleOnDelete(item.id)}>
                                                <FaTrashAlt /> Delete
                                            </Button>
                                            <Button variant='outline-warning' as={Link}
                                                to={`/updateRoom/${item.id}`}>
                                                <GrDocumentUpdate /> Update
                                            </Button>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            {
                token ?
                    <div className='d-flex align-items-center '>
                        <Button variant="success" type='submit' className=' my-3 mx-auto w-50'
                            as={Link}
                            to={`/createRoom`}>
                            Create New Meeting Room
                        </Button>
                    </div>
                    : <></>
            }

        </Container>
    );
}

export default Main;