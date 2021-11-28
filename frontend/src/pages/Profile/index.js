import React, { useEffect, useState } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile(props) {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const [incidents, setIncidents] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: token,
                Context: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [token, ongId]);

    async function handleLogout() {
        localStorage.clear();
        navigate('/');
    }
    async function handleUpdateIncident(incidentId) {
        navigate('/incidents/update/' + incidentId);
    }
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`delete_incidents/${id}`, {
                headers: {
                    Authorization: token,
                    Context: ongId
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            for (const status in error.response.data) {
                alert(status + ': ' + error.response.data[status]);
            }
        }

    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, {ongName} </span>
                <Link className="button" to="/incidents/new"> Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="E02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                        <strong>Descrição</strong>
                        <p> {incident.description}</p>
                        <strong>Valor</strong>
                        <p> {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                        <button onClick={() => handleUpdateIncident(incident.id)} id={'update'} type="button">
                            <FiEdit2 size={20} color="#A8A8B3" />

                        </button>

                        <button onClick={() => handleDeleteIncident(incident.id)} type="button" id={'delete'}>
                            <FiTrash2 size={20} color="#A8A8B3" />

                        </button>
                    </li>
                ))}
            </ul>


        </div >
    );
}