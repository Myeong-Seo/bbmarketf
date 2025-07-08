import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/reset-password', {
                token,
                newPassword,
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

    if (!token) {
        return <p>유효하지 않은 접근입니다.</p>;
    }

    return (
        <div>
            <h2>비밀번호 재설정</h2>
            <form onSubmit={handleReset}>
                <input
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button type="submit">비밀번호 재설정</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;