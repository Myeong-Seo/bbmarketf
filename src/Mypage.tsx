import { useState } from "react";
import axios from "axios";
import * as React from "react";
import {useNavigate} from "react-router-dom";

export default function Mypage() {
    const [form, setForm] = useState({
        userId: '', password: '', name: '', phoneNumber: '', address: '',
         role: '', status: '', create_at: '', latest_at: '', sotial_id: ''});
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
            <input name="userId" onChange={handleChange} value={form.userId} readOnly />
            <input name="password" onChange={handleChange} value={form.password}/>
            <input name="name" onChange={handleChange} value={form.name} readOnly/>
            <input name="phoneNumber" onChange={handleChange} value={form.phoneNumber} maxLength={11}/>
            <input name="address" onChange={handleChange} value={form.address}/>
            <input name="role" onChange={handleChange} value={form.role} readOnly/>
            <input name="status" onChange={handleChange} value={form.status} readOnly/>
            <input name="create_at" onChange={handleChange} value={form.create_at} readOnly/>
            <input name="latest_at" onChange={handleChange} value={form.latest_at} readOnly/>
            <input name="social_id" onChange={handleChange} value={form.sotial_id} readOnly/>
            <div>
                <button>완료</button>
                <button type="button" onClick={goBack}>뒤로가기</button>
            </div>
        </form>
    );

}