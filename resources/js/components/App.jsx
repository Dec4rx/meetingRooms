import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Main from "./Main"
import Register from "./Register";
import Login from "./Login";
import History from "./History";

export const App = () => {
    return (
        <BrowserRouter basename="/meetingRooms/public/">
            <Routes>
                {/* Define a route that always renders the NavBar, and nest other routes within it */}
                <Route path="/" element={<NavBar />}>
                    {/* Define the default (index) route under NavBar */}
                    <Route index element={<Main />} />
                    <Route path="register" element={<Register />}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="history" element={<History/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
