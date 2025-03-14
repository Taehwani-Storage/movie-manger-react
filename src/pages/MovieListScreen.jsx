import React, {useState, useEffect, useCallback} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Pagination from '../components/Pagination.jsx';
import NavBar from '../components/NavBar.jsx';

const MovieListScreen = () => {
    const {pageNo} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt');
    const role = localStorage.getItem('role') ? parseInt(localStorage.getItem('role')) : null;

    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(Number(pageNo) || 1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(5);
    const [maxPage, setMaxPage] = useState(5);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        if (!pageNo || isNaN(Number(pageNo))) {
            navigate('/movies/1'); // URL이 잘못된 경우 1페이지로 리다이렉트
            return;
        }
        getMoviesByPageNo(Number(pageNo));
    }, [pageNo, navigate, token]);

    const getMoviesByPageNo = async (pageNo) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/movie/showAll/${pageNo}`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setMovies(response.data.list);
            setStartPage(response.data.startPage);
            setEndPage(response.data.endPage);
            setCurrentPage(response.data.currentPage);
            setMaxPage(response.data.maxPage);
        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 403) {
                    alert('접근 권한이 없습니다. 로그인 페이지로 이동합니다.');
                    navigate('/login');
                } else {
                    alert(`오류 발생: ${error.response.statusText}`);
                }
            } else {
                alert('서버와 연결할 수 없습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleMovieClick = useCallback((movieNo) => {
        navigate(`/movie/${movieNo}`);
    }, [navigate]);

    const changePage = (pageNo) => {
        if (pageNo >= 1 && pageNo <= maxPage) {
            navigate(`/movies/${pageNo}`);
        }
    };

    return (
        <div className="container">
            <NavBar selectedPage="영화"/>
            <h1 style={{ marginTop: "20px" }}>🎬 영화 리스트</h1>
            {isLoading ? (
                <div className="loading">⏳ 로딩 중...</div>
            ) : (
                <div className="movie-list">
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <div key={movie.movieNo} className="movie-item"
                                 onClick={() => handleMovieClick(movie.movieNo)}>
                                <div className="movie-icon">🎬</div>
                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <p>{movie.director} - {movie.runningTime}분</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-movies">등록된 영화가 없습니다.</div>
                    )}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                startPage={startPage}
                endPage={endPage}
                maxPage={maxPage}
                baseUrl="/movie/showAll"
                onPageChange={changePage}
            />
        </div>
    );
};

export default MovieListScreen;

