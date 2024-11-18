import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

import AddTask from './components/task_add';
import Login from './components/login';
import Signup from './components/sign_up';
import TasksList from './components/task_list';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import TaskDataService from './services/tasks';
import Notifications from './components/notification'; 
import NotificationsTable from './components/notificationTable';

function App() {
    const [email, setUser] = React.useState(null);
    const [token, setToken] = React.useState(null);
    const[username, setUsername] = React.useState(null);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [onLoginPage, isOnLoginPage] = React.useState(true);
    const [error, setError] = React.useState('');
    const location = useLocation();
    const navigate = useNavigate();

    async function login(user = null) {
        TaskDataService.login(user)
        .then(response => {
            setToken(response.data.token);
            setUser(user.email);
            setUsername(response.data.user_data.username);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', user.email);
            localStorage.setItem('username', response.data.user_data.username);
            setIsAuthenticated(true);
            setError('');
        })
        .catch(e => {
            console.log('login', e);
            setError(e.toString());
        });
    }

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedEmail = localStorage.getItem('email');
        const storedUsername = localStorage.getItem('username');
        if (storedToken && storedEmail && storedUsername) {
          setToken(storedToken);
          setUser(storedEmail);
          setUsername(storedUsername)
          setIsAuthenticated(true);
          isOnLoginPage(false);

        }
      }, []);

      useEffect(() => {
        if (isAuthenticated && (location.pathname === '/login' || location.pathname === '/')){
          isOnLoginPage(false);
          navigate('/taches');
        }
      }, [isAuthenticated, location.pathname, navigate]);
    

    // Fonction signup pour inscrire un nouvel utilisateur
    async function signup(newUser) {
        TaskDataService.signup(newUser)
            .then(response => {
                setUser(newUser.email);
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', newUser.email);
                setError('');
            })
            .catch(e => {
                console.log('signup', e);
                setError(e.toString());
            });
    }
  
    const logout = ()=>{
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        isOnLoginPage(true);
        localStorage.removeItem('token');
        localStorage.removeItem('use_email');
        navigate('/login');
      };

    return (
        <div className="App">
            <Navbar className="custom-navbar" expand="lg">
                <Container>
                    <Navbar.Brand className="brand">TodosApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {/* Affichage du composant Notifications */}
                            <Link className="nav-link" to="/taches">Tâches</Link>
                            {isAuthenticated ? (
                                <>
                                    <span className="nav-link logout-link" onClick={logout}>Se déconnecter ({username})</span>
                                    <div className="notification-icon ms-auto">
                                        <Notifications token={token} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link className="nav-link" to="/login">Se connecter</Link>
                                    <Link className="nav-link" to="/signup">S'inscrire</Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<Login login={login} />} />
                    <Route path="/login" element={<Login login={login} />} />
                    <Route path="/signup" element={<Signup signup={signup} />} />
                    <Route path="/taches/create" element={<AddTask token={token} />} />
                    <Route path="/taches/:id" element={<AddTask token={token} />} />
                    <Route path="/taches" element={<TasksList token={token} />} />
                    <Route path="/notifications" element={<NotificationsTable />} />
                </Routes>
            </div>
            <footer className="text-center text-lg-start bg-light text-muted mt-4">
                <div className="text-center p-4">
                    © Copyright - <a target="_blank" rel="noopener noreferrer" className="text-reset fw-bold text-decoration-none" href="https://twitter.com/greglim81">Greg Lim</a> - <a target="_blank" rel="noopener noreferrer" className="text-reset fw-bold text-decoration-none" href="https://twitter.com/danielgarax">Daniel Correa</a>
                </div>
            </footer>
        </div>
    );
}

export default App;
