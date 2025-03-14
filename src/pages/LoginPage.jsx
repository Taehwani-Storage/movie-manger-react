import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/user/logIn', {
                username,
                password,
            });

            if (response.status === 200) {
                localStorage.setItem('jwt', response.data.token);
                localStorage.setItem('role', response.data.role);
                navigate('/movie/showAll/1');
            } else {
                alert(response.data.message || '로그인 실패');
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
            <button
                onClick={handleLogin}
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
                {isLoading ? '로그인 중...' : '로그인'}
            </button>
            <button
                onClick={() => navigate('/register')}
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
                회원가입 페이지로 이동
            </button>
        </div>
    );
};

export default LoginPage;