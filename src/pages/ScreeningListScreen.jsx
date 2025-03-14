import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from "../components/Pagination.jsx";
import NavBar from "../components/NavBar.jsx";

const ScreeningListScreen = () => {
    const { pageNo } = useParams();
    const navigate = useNavigate();
    const [screenings, setScreenings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [startPage, setStartPage] = useState(1);
    const [endPage, setEndPage] = useState(5);
    const [maxPage, setMaxPage] = useState(5);
    const token = localStorage.getItem('jwt');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        getScreeningsByPageNo(parseInt(pageNo));
    }, [pageNo, navigate, token]);

    const getScreeningsByPageNo = async (pageNo) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/screening/showAll/${pageNo}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setScreenings(response.data.list);
            setStartPage(response.data.startPage);
            setEndPage(response.data.endPage);
            setCurrentPage(response.data.currentPage);
            setMaxPage(response.data.maxPage);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: 'white', padding: '20px', margin: '30px' }}>
            <NavBar selectedPage="상영관" />
            <h1 style={{ marginTop: "20px" }}>🎥 상영관 목록</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {screenings.map((screening) => (
                        <div key={screening.screeningNo} onClick={() => navigate(`/screening/${screening.screeningNo}`)}
                             style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
                            <div>🎥</div>
                            <div>
                                <h3>{screening.movieTitle}</h3>
                                <p>{screening.theaterName} - {screening.screeningTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Pagination
                currentPage={currentPage}
                startPage={startPage}
                endPage={endPage}
                maxPage={maxPage}
                baseUrl="/screening/showAll"
            />
        </div>
    );
};

export default ScreeningListScreen;
