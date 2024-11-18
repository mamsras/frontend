// src/components/TasksList.js
import React, { useState, useEffect } from 'react';
import TaskDataService from '../services/tasks';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import dayjs from 'dayjs';
import Form from 'react-bootstrap/Form';
import 'dayjs/locale/fr';
import '../styles/task.css';


//composant qui affiche la liste des tâches
const TasksList = (props) => {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        retrieveTasks();
    }, [props.token, statusFilter]);

    const retrieveTasks = () => {
        const filters = statusFilter ? { status: statusFilter } : {};
        TaskDataService.getAllTask(props.token, filters)
            .then(response => {
                setTasks(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleStartTask = (id) => {
        TaskDataService.startTask(id, props.token)
            .then(() => retrieveTasks())
            .catch(e => console.log(e));
    };

    const handleCompleteTask = (id) => {
        TaskDataService.completeTask(id, props.token)
            .then(() => retrieveTasks())
            .catch(e => console.log(e));
    };

    const handleDeleteTask = (id) => {
        TaskDataService.deleteTask(id, props.token)
            .then(() => retrieveTasks())
            .catch(e => console.log(e));
    };

    const handleFilterChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case 'À faire':
                return 'to-do';
            case 'En cours':
                return 'in-progress';
            case 'Terminé':
                return 'completed';
            case 'Inachevé':
                return 'unfinished';
            default:
                return '';
        }
    };

    return (
        <Container className='task-container'>
            {props.token == null || props.token === "" ? (
                <Alert variant='warning'>
                    Vous n'êtes pas connecté. Connectez-vous <Link to={"/login"}>ici</Link> pour voir vos tâches.
                </Alert>
            ) : (
                <div>
                    <Link to={"/taches/create"}>
                        <Button variant="outline-info" className="mb-3 btn-custom task-card-add-btn">
                            Ajouter une tâche
                        </Button>
                    </Link>

                    {/* Radio buttons pour filtrer les tâches */}
                    <div className="radio-group filter-radio-btn">
                        <Form.Check
                            inline
                            type="radio"
                            label="Tous"
                            value=""
                            checked={statusFilter === ''}
                            onChange={handleFilterChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="À faire"
                            value="À faire"
                            checked={statusFilter === 'À faire'}
                            onChange={handleFilterChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="En cours"
                            value="En cours"
                            checked={statusFilter === 'En cours'}
                            onChange={handleFilterChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Terminé"
                            value="Terminé"
                            checked={statusFilter === 'Terminé'}
                            onChange={handleFilterChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="Inachevé"
                            value="Inachevé"
                            checked={statusFilter === 'Inachevé'}
                            onChange={handleFilterChange}
                        />
                    </div>

                    {tasks.map((task) => {
                        dayjs.locale('fr');  // utiliser la date locale en français
                        const createdAt = dayjs(task.createdAt).format('DD MMMM YYYY');
                        const statusClass = getStatusClass(task.status);

                        return (
                            <Card key={task.task_id} className={`task-card ${statusClass}`}>
                                <div className="task-status-bar"></div> {/* Barre colorée */}
                                <div className="task-content">
                                    <Card.Title>{task.description}</Card.Title>
                                    <Card.Text><b>Statut:</b> {task.status}</Card.Text>
                                    <Card.Text>Créé le: {createdAt}</Card.Text>
                                    <Link to={{
                                        pathname: "/taches/" + task.task_id,
                                        state: { currentTask: task }
                                    }}>
                                        <Button variant="outline-info" className="me-2 btn-custom">
                                            Modifier
                                        </Button>
                                    </Link>
                                    {task.status === 'À faire' && (
                                        <Button variant="outline-success" className="me-2 btn-custom" onClick={() => handleStartTask(task.task_id)}>
                                            Commencer
                                        </Button>
                                    )}
                                    {task.status === 'En cours' && (
                                        <Button variant="outline-primary" className="me-2 btn-custom" onClick={() => handleCompleteTask(task.task_id)}>
                                            Terminé
                                        </Button>
                                    )}
                                    <Button variant="outline-danger" className="btn-custom" onClick={() => handleDeleteTask(task.task_id)}>
                                        Supprimer
                                    </Button>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </Container>
    );
};

export default TasksList;
