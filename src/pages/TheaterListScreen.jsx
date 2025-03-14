import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from "../components/Pagination.jsx";
import NavBar from "../components/NavBar.jsx";

const TheaterListScreen = () => {
    const { pageNo } = useParams();
    const navigate = useNavigate();
    const [theaters, setTheaters] = useState([]);
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
        getTheatersByPageNo(parseInt(pageNo));
    }, [pageNo, navigate, token]);

    const getTheatersByPageNo = async (pageNo) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/theater/showAll/${pageNo}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setTheaters(response.data.list);
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
            <NavBar selectedPage="극장" />
            <h1 style={{ marginTop: "20px" }}>🎭 극장 목록</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {theaters.map((theater) => (
                        <div key={theater.theaterNo} onClick={() => navigate(`/theater/${theater.theaterNo}`)}
                             style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ddd' }}>
                            <div>🎭</div>
                            <div>
                                <h3>{theater.name}</h3>
                                <p>{theater.address}</p>
                                <p>{theater.phone}</p>
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
                baseUrl="/theater/showAll"
            />
        </div>
    );
};

export default TheaterListScreen;
