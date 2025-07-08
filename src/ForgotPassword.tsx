// src/pages/ForgotPassword.tsx

import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/forgot-password', {
                userId: userId,
            });
            setMessage(response.data);
        } catch (error: any) {
            if (error.response) {
                setMessage(error.response.data);
            } else {
                setMessage('에러가 발생했습니다.');
            }
        }
    };

    return (
        <div>
            <h2>비밀번호 재설정 요청</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="이메일 (social_id)"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <button type="submit">재설정 메일 보내기</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;