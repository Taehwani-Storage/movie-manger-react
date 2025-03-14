import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieListScreen from './pages/MovieListScreen.jsx';
import TheaterListScreen from './pages/TheaterListScreen.jsx';
import ScreeningListScreen from './pages/ScreeningListScreen.jsx';
import MovieDetailScreen from './pages/MovieDetailScreen.jsx';
import LoginScreen from './pages/LoginPage.jsx';
import RegisterScreen from './pages/Register.jsx';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginScreen />} />
                <Route path="/movie/showAll/:pageNo" element={<MovieListScreen />} />
                <Route path="/theater/showAll/:pageNo" element={<TheaterListScreen />} />
                <Route path="/screening/showAll/:pageNo" element={<ScreeningListScreen />} />
                <Route path="/movie/showOne/:movieNo" element={<MovieDetailScreen />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
