import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/user/register', {
                username,
                password,
                nickname,
            });

            if (response.status === 200) {
                alert('회원가입 성공');
                navigate('/login');
            } else {
                alert(response.data.message || '회원가입 실패');
            }
        } catch (error) {
            console.error(error);
            alert('네트워크 오류 발생');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <h1 style={{ fontSize: '60px', marginBottom: '20px' }}>Cinema Worlds 🎬</h1>
            <input
                type="text"
                placeholder="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#f0f0f0',
                }}
            />
            <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '16px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#f0f0f0',
                }}
            />
            <input
                type="text"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{
                    width: '100%',
                    padding: '12px',
                    marginBottom: '40px',
                    borderRadius: '12px',
                    border: 'none',
                    backgroundColor: '#f0f0f0',
                }}
            />
            <button
                onClick={handleRegister}
                disabled={isLoading}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#3f51b5',
                    color: 'white',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                }}
            >
                {isLoading ? '회원가입 중...' : '회원가입'}
            </button>
            <button
                onClick={() => navigate('/login')}
                style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#0000008a',
                    color: 'white',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: '16px',
                    marginTop: '16px',
                    cursor: 'pointer',
                }}
            >
                로그인 페이지로 이동
            </button>
        </div>
    );
};

export default RegisterPage;