import React, { useEffect } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { useForm } from "react-hook-form";

export default function NewIncident() {

    const ongId = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const incidents = useParams();

    const { register, handleSubmit, errors, reset } = useForm({
        defaultValues: { title: "", description: "", value: "" },
    });
    useEffect(() => {
        if (incidents) {
            api.get(`/profile/${incidents.idIncidents}`, {
                headers: {
                    Authorization: token,
                    Context: ongId
                }
            }).then(response => {
                reset(response.data);
            })
        }

    }, [reset]);

    async function handleIncident({ title, description, value }, e) {
        e.preventDefault();
        const data = { title, description, value };
        try {
            if (incidents.idIncidents) {
                await api.put(`update_incidents/${incidents.idIncidents}`, data, {
                    headers: {
                        Authorization: token,
                        context: ongId
                    }
                })
            } else {
                await api.post('register_incidents', data, {
                    headers: {
                        Authorization: token,
                        context: ongId
                    }
                })
            }
            navigate('/profile');
        } catch (error) {
            for (const status in error.response.data) {
                alert(status + ': ' + error.response.data[status]);
            }
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar Novo Caso</h1>
                    <p> Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="E02041" />
                        Voltar para a Home
                    </Link>
                </section>
                <form onSubmit={handleSubmit(handleIncident)}>
                    <input placeholder="Titulo do Caso" {...register('title', { required: true })} />
                    <textarea placeholder="Descrição" {...register('description', { required: true })} />
                    <input type="number" min="1" step="any" placeholder="Valor em Reais" {...register('value', { required: true })} />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div >
    );
}
