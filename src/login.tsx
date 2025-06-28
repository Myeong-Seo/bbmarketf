import {useState} from "react";
import axios from "axios";


function Login(){
    const [form, setForm] = useState({ email: '', password: ''});


    //username = 입력된 아이디 값
    //setUsername = 상태 업데이트 함수
    //useState('') = 상태의 초기값을 빈 문자열로 설정

    //입력값이 바뀌 때 실행되는 함수
    //입력값을 매개변수 e로 받음. React에서 정의한 input 이벤트 타입
    //const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
   //     setUsername(e.target.value)
   // }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>
             setForm({ ...form, [e.target.name]: e.target.value });



    const handleLogin = async (e : React.FormEvent) => {
            e.preventDefault();
            const response = await axios.post('http://localhost:8080/api/user/login',form);
                alert(response.data);
            console.log(response.data);
    }


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