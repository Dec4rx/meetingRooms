import { Table, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import axios from 'axios';

const History = () => {
    const user_id = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');

    const [meetingRooms, setmeetingRooms] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:80/meetingRooms/public/api/reservations/${user_id}/past`,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                setmeetingRooms(res.data)
            })
    }, [])
    return (

        <Container>

            <Table striped bordered hover responsive className="my-5">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Meeting Room Name</th>
                        <th>Start date and time</th>
                        <th>End date and time</th>
                    </tr>
                </thead>
                {
                    meetingRooms.map(item =>
                        <tbody>
                            <tr>
                                <td>{item.meeting_room_id}</td>
                                <td>{item.meeting_room_name}</td>
                                <td>{item.start_time}</td>
                                <td>{item.end_time}</td>
                            </tr>

                        </tbody>
                    )
                }

            </Table>

        </Container>
    );
}

export default History;