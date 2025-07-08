import {Navigate, Route, Routes} from "react-router-dom";
import Signup from './Signup';
import Mypage from "./Mypage";
import Login from "./Login";
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to = "/login"/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
                <Route path="/me" element={<Mypage/>} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </div>
    );
}

export default App;

