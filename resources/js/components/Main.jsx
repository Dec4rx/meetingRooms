import { Table, Container } from 'react-bootstrap';

function Main() {
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
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>x</td>
                        <td>x</td>
                        <td>x</td>
                        <td>x</td>
                        <td>x</td>
                    </tr>
                   
                </tbody>
            </Table>

        </Container>
    );
}

export default Main;