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
            <h3>아이디</h3>
            <input name="userId" onChange={handleChange} value={form.userId} readOnly />
            <h3>비밀번호</h3>
            <input name="password" onChange={handleChange} value={form.password}/>
            <h3>이름</h3>
            <input name="name" onChange={handleChange} value={form.name} readOnly/>
            <h3>전화번호</h3>
            <input name="phoneNumber" onChange={handleChange} value={form.phoneNumber} maxLength={11}/>
            <h3>주소</h3>
            <input name="address" onChange={handleChange} value={form.address}/>
            <h3>회원등급</h3>
            <input name="role" onChange={handleChange} value={form.role} readOnly/>
            <h3>회원상태</h3>
            <input name="status" onChange={handleChange} value={form.status} readOnly/>
            <h3>생성일시</h3>
            <input name="create_at" onChange={handleChange} value={form.create_at} readOnly/>
            <h3>최근접속일</h3>
            <input name="latest_at" onChange={handleChange} value={form.latest_at} readOnly/>
            <h3>name</h3>
            <input name="social_id" onChange={handleChange} value={form.sotial_id} readOnly/>
            <br/>
            <div>
                <button>완료</button>
                <button type="button" onClick={goBack}>뒤로가기</button>
            </div>
        </form>
    );

}