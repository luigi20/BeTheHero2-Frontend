import React, { useState } from 'react';
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';

export default function Logon() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    async function handleLogon(e) {
        e.preventDefault();
        try {
            const response = await api.post('authenticate', { email, password });
            localStorage.setItem('ongName', response.data.name);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.id);
            navigate('/profile');
        } catch (error) {
            for (const status in error.response.data) {
                alert(status + ': ' + error.response.data[status]);
            }
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the Hero" />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Seu Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Sua Senha" type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button className="button" type="submit"> Entrar </button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041" />
                        Não tenho Cadastro</Link>

                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}