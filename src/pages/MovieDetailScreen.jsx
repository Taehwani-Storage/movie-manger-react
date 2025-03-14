import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetailScreen = () => {
    const { movieNo } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [role, setRole] = useState(null);
    const [score, setScore] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const role = localStorage.getItem('role');
                setRole(role ? parseInt(role) : null);

                const movieResponse = await axios.get(`http://localhost:8080/api/movie/showOne/${movieNo}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMovie(movieResponse.data);

                const ratingResponse = await axios.get(`http://localhost:8080/api/rating/showOne/${movieNo}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setRatings(ratingResponse.data);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchData();
    }, [movieNo, navigate]);

    const handleScoreSubmit = async () => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.post(
                'http://localhost:8080/api/rating/addScore',
                { movieNo, score },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('평점이 등록되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    const handleReviewSubmit = async () => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.post(
                'http://localhost:8080/api/review/addReview',
                { movieNo, comment },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('평론이 등록되었습니다.');
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>감독: {movie.director}</p>
            <p>상영 시간: {movie.runningTime}분</p>

            <h2>평점 정보</h2>
            {ratings.map((rating) => (
                <div key={rating.ratingNo}>
                    <p>평점: {rating.score}</p>
                    {rating.comment && <p>평론: {rating.comment}</p>}
                </div>
            ))}

            {role === 1 && (
                <div>
                    <h3>평점 수정</h3>
                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                    />
                    <button onClick={handleScoreSubmit}>평점 등록</button>
                </div>
            )}

            {role === 2 && (
                <div>
                    <h3>평론 작성</h3>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="평론을 작성해주세요."
                    />
                    <button onClick={handleReviewSubmit}>평론 등록</button>
                </div>
            )}
        </div>
    );
};

export default MovieDetailScreen;