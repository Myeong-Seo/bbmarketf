import { useState } from "react";
import axios from "axios";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function Mypage() {
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
        await axios.post("http://localhost:8080/api/user/me", form)
        alert("회원정보수정이 완료되었습니다");
        navigate('/me');
    };

    return (
        <form onSubmit={handleSubmit}>
            <p></p>
            <input name="userId" onChange={handleChange} value={form.userId}/>
            <input name="password" onChange={handleChange} value={form.password}/>
            <input name="name" onChange={handleChange} value={form.name}/>
            <input name="phoneNumber" onChange={handleChange} value={form.phoneNumber}/>
            <input name="address" onChange={handleChange} value={form.address}/>
            <div>
                <button>완료</button>
                <button type="button" onClick={goBack}>뒤로가기</button>
            </div>
        </form>
    );

}