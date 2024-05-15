import { Table, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import { MdEventAvailable, MdNewReleases } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";
import { FaTrashAlt } from "react-icons/fa";
import Button from 'react-bootstrap/Button'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Main = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

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
        await axios.patch(`http://localhost:80/meetingRooms/public/api/reservations/${roomId}/release`,
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

            <Table striped bordered hover responsive className="my-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Meeting Room Name</th>
                        <th>Capacity</th>
                        <th>Available</th>
                        <th>Available Until</th>
                        {token ?
                            <th>Actions</th>
                            : <></>
                        }
                    </tr>
                </thead>
                {
                    meetingRooms.map(item =>
                        <tbody>
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.capacity}</td>
                                <td>
                                    {item.is_occupied /**Depending on the user_id shows reserve and not the icon CgUnavailable */
                                        ? user_id != item.user_id ? <CgUnavailable style={{ color: 'red' }}  />: <></>
                                        /**TODO Reserva */
                                        : <Button variant='outline-success' size="sm" onClick={() => handleDelete(item.id)} > <MdEventAvailable /> Reserve </Button>
                                    }
                                    {token && user_id == item.user_id
                                        ? <Button variant='outline-warning' size="sm" onClick={() => handleOnRelease(item.id)} > <MdNewReleases /> Release </Button>
                                        : <></>
                                    }
                                </td>
                                <td>{item.occupied_until}</td>
                                <td>
                                    {token ?
                                        <Button variant='outline-danger' size="sm" onClick={() => handleOnDelete(item.id)} > <FaTrashAlt /> </Button>
                                        : <></>}
                                        
                                </td>
                            </tr>

                        </tbody>
                    )
                }

            </Table>

        </Container>
    );
}

export default Main;