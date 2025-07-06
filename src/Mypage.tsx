import {useEffect, useState} from "react";
import axios from "axios";
import * as React from "react";
import {useNavigate} from "react-router-dom";


export default function Mypage() {
    const [form, setForm] = useState({
        userId: '', password: '', name: '', phoneNumber: '', address: '',
        role: '', status: '', create_at: '', latest_at: '', social_id: ''
    });

    const [loading, setLoading] = useState(true); // ✅ 로딩 상태
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    /*
    const goBack = () => {
        navigate(-1);
    };
*/
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:8080/api/user/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setForm(response.data);
            } catch (error) {
                alert("회원정보를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // 입력값 핸들링
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // 정보 수정 요청
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8080/api/user/update", form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert("회원정보가 수정되었습니다.");
            navigate("/me");
        } catch (err) {
            console.error(err);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    // 회원 탈퇴
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete("http://localhost:8080/api/user/delete", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data: {
                    password: deletePassword
                }
            });
            alert("회원 탈퇴가 완료되었습니다.");
            localStorage.removeItem("token");
            navigate("/login");
        } catch (err: any) {
            if (err.response && err.response.status === 403) {
                alert("비밀번호가 일치하지 않습니다.");
            } else {
                alert("회원 탈퇴 중 오류가 발생했습니다.");
            }
        } finally {
            //모달에 전달
            setShowModal(false);
            setDeletePassword('');
        }
    };

    //회원 탈퇴 처리 모달
    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');

    const DeleteModal = () => (
        <div style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
            alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px' }}>
                <h3>비밀번호를 입력해주세요</h3>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    autoFocus
                />
                <div style={{ marginTop: '1rem' }}>
                    <button onClick={handleDelete} style={{ marginRight: '1rem' }}>탈퇴하기</button>
                    <button onClick={() => setShowModal(false)}>취소</button>
                </div>
            </div>
        </div>
    );

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPasswordInput, setCurrentPasswordInput] = useState('');
    const [newPassword, setNewPassword] = useState('');//신규 패스워드
    const [isVerified, setIsVerified] = useState(false);

    const handlePasswordCheck = () => {
        if(currentPasswordInput === form.password){
            setIsVerified(true); // 비밀번호 일치
        }else{
            alert("현재 비밀번호가 일치하지 않습니다.");
        }
    }

    const handlePasswordUpdate = async () => {
        try {
            const token = localStorage.getItem("token");

            await axios.put("http://localhost:8080/api/user/change-password", {
                currentPassword: currentPasswordInput,
                newPassword: newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert("비밀번호가 변경되었습니다.");
            setShowPasswordModal(false);
            setIsVerified(false);
            setCurrentPasswordInput('');
            setNewPassword('');
            setForm(prev => ({ ...prev, password: newPassword }));
        } catch (err) {
            alert("비밀번호 변경 중 오류가 발생했습니다.");
        }
    };

    if (loading) return <div>로딩 중...</div>;

    return (
        <div>
            <h2>회원정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <h3>아이디</h3>
                <input name="userId" onChange={handleChange} value={form.userId} readOnly />

                <h3>비밀번호</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                        name="password"
                        value=""
                        disabled
                        style={{ width: '170px', backgroundColor: '#f0f0f0', color: '#888' }}
                    />
                    <button type="button" onClick={() => setShowPasswordModal(true)}>
                        비밀번호 수정
                    </button>
                </div>

                <h3>이름</h3>
                <input name="name" onChange={handleChange} value={form.name} readOnly />

                <h3>전화번호</h3>
                <input name="phoneNumber" onChange={handleChange} value={form.phoneNumber} maxLength={11} />

                <h3>주소</h3>
                <input name="address" onChange={handleChange} value={form.address} />

                <h3>회원등급</h3>
                <input name="role" onChange={handleChange} value={form.role} readOnly />

                <h3>회원상태</h3>
                <input name="status" onChange={handleChange} value={form.status} readOnly />

                <h3>생성일시</h3>
                <input name="create_at" onChange={handleChange} value={form.create_at ? form.create_at.slice(0, 10) : ''} readOnly />

                <h3>최근접속일</h3>
                <input name="latest_at" onChange={handleChange} value={form.latest_at ? form.latest_at.slice(0, 10) : ''} readOnly />

                <h3>social_ID</h3>
                <input name="social_id" onChange={handleChange} value={form.social_id} readOnly />

                <br />
                <div style={{ marginTop: '1rem' }}>
                    <button type="submit">완료</button>
                    <button type="button" onClick={() => navigate(-1)}>뒤로가기</button>
                    <button type="button" onClick={() => setShowModal(true)} style={{ color: 'red' }}>회원 탈퇴</button>
                </div>
            </form>

            {/* 비밀번호 변경 모달 */}
            {showPasswordModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px' }}>
                        {!isVerified ? (
                            <>
                                <h3>현재 비밀번호 확인</h3>
                                <input
                                    type="password"
                                    placeholder="현재 비밀번호"
                                    value={currentPasswordInput}
                                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                                    autoFocus
                                />
                                <div style={{ marginTop: '1rem' }}>
                                    <button type="button" onClick={handlePasswordCheck}>확인</button>
                                    <button type="button" onClick={() => {
                                        setShowPasswordModal(false);
                                        setCurrentPasswordInput('');
                                    }}>취소</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3>새 비밀번호 입력</h3>
                                <input
                                    type="password"
                                    placeholder="새 비밀번호"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    autoFocus
                                />
                                <div style={{ marginTop: '1rem' }}>
                                    <button type="button" onClick={handlePasswordUpdate}>변경</button>
                                    <button type="button" onClick={() => {
                                        setShowPasswordModal(false);
                                        setIsVerified(false);
                                        setCurrentPasswordInput('');
                                        setNewPassword('');
                                    }}>취소</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* 회원 탈퇴 모달 */}
            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px' }}>
                        <h3>비밀번호를 입력해주세요</h3>
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={deletePassword}
                            onChange={(e) => setDeletePassword(e.target.value)}
                            autoFocus
                        />
                        <div style={{ marginTop: '1rem' }}>
                            <button type="button" onClick={handleDelete} style={{ marginRight: '1rem', color: 'red' }}>탈퇴하기</button>
                            <button type="button" onClick={() => setShowModal(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}