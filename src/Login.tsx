import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Login(){
    const [form, setForm] = useState({ email: '', password: ''});
    const navigate = useNavigate();


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', form);

            // 백엔드에서 토큰을 리턴한다고 가정할 때
            const token = response.data.token;

            // 1. 로컬스토리지에 토큰 저장
            localStorage.setItem("token", token);

            alert("로그인 성공");
            navigate("/me");
        } catch (error: any) {
            alert("로그인 실패: " + error.response?.data || "알 수 없는 오류");
            console.error(error);
        }
    };


    return (
        <div>
            <h1>로그인</h1>
            <input name = "userId" type = "text" placeholder = "아이디를 입력하세요" onChange={handleChange}/>
            <input name = "password" type = "text" placeholder = "비밀번호를 입력하세요" onChange = {handleChange}/>
            <button onClick={handleLogin}>로그인</button>
        </div>
    )
}
export default Login;