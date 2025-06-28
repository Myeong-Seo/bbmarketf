import { useState } from "react";
import axios from "axios";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({
        userId: '', password: '', name: '', phoneNumber: '', address: ''});
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({...form, [e.target.name]: e.target.value});
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/api/user/signup", form)
        alert("회원가입이 완료되었습니다");
        navigate('/login');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="userId" onChange={handleChange} placeholder="아이디"/>
            <input name="password" onChange={handleChange} placeholder="비밀번호"/>
            <input name="name" onChange={handleChange} placeholder="이름"/>
            <input name="phoneNumber" onChange={handleChange} placeholder="전화번호"/>
            <input name="address" onChange={handleChange} placeholder="주소"/>
            <div>
                <button>완료</button>
                <button type="button" onClick={goBack}>뒤로가기</button>
            </div>
        </form>
    );

}