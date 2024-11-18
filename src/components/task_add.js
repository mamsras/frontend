import React, { useState, useEffect } from 'react';
import TaskDataService from '../services/tasks';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Duration } from 'luxon';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../styles/form.css';

const AddTask = ({ token }) => {
    const { id } = useParams(); // récupérer l'id de la tâche (lorsque le formulaire est en mode editing)
    const editing = !!id;
    const [formData, setFormData] = useState({
        description: '',
        duration: '',
        start: '',
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (id) {
            // récupérer les détails de la tâche pour être afficher dans la formulaire de modification
            TaskDataService.getTask(id, token)
                .then(response => {
                    setFormData({
                        description: response.data.description,
                        duration: response.data.duration,
                        start: new Date(response.data.createdAt).toISOString().slice(0, 16), // formatter les dates en dates locales 
                    });
                })
                .catch(e => console.log(e));
        }
    }, [id, token]);

    //convertir les durées en secondes (pour être compatible avec timedelta)
    function convertDurationToSeconds(duration) {
        const regex = /(\d+)\s*(minute|heure|jour)s?/;
        const match = duration.match(regex);
        if (!match) return 0;

        const [, amount, unit] = match;
        const multiplier = { minute: 60, heure: 3600, jour: 86400 }[unit] || 0;
        return parseInt(amount, 10) * multiplier;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const saveTask = () => {
        const data = {
            description: formData.description,
            duration: convertDurationToSeconds(formData.duration),
            begin_at: formData.start,
        };

        const request = editing
            ? TaskDataService.updateTask(id, data, token)
            : TaskDataService.createTask(data, token);

        request
            .then(() => setSubmitted(true))
            .catch(console.log);
    };

    return (
        <Container className='task-add-container'>
            {submitted ? (
                <div>
                    <h4>Votre tâche a été {editing ? 'modifiée' : 'ajoutée'} avec succès</h4>
                    <Link to="/taches/">Voir les tâches</Link>
                </div>
            ) : (
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{editing ? 'Modifier' : 'Ajouter'} une tâche</Form.Label>
                        <Form.Control
                            type="text"
                            className='task-add-form'
                            required
                            placeholder="Acheter du pain"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Prévue le: </Form.Label>
                        <Form.Control
                            type="datetime-local"
                            className='task-add-form'
                            required
                            name="start"
                            value={formData.start}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Durée: </Form.Label>
                        <Form.Control
                            as="select"
                            name="duration"
                            className='task-add-form'
                            value={formData.duration}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Choisir la durée</option>
                            <option value="30 minutes">30 minutes</option>
                            <option value="1 heure">1 heure</option>
                            <option value="2 heures">2 heures</option>
                            <option value="3 heures">3 heures</option>
                            <option value="4 heures">4 heures</option>
                            <option value="1 jour">1 jour</option>
                        </Form.Control>
                    </Form.Group>

                    <Button variant="info" onClick={saveTask}>
                        {editing ? 'Modifier' : 'Ajouter'}
                    </Button>
                </Form>
            )}
        </Container>
    );
};

export default AddTask;
