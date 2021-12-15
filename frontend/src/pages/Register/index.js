import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { useForm } from 'react-hook-form';
import axios from 'axios';
export default function Register() {
    const [selectedUf, setSelectedUf] = useState('0');
    const [citiesNames, setCitiesNames] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [selectedCity, setSelectedCity] = useState('0');
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues: { name: "", email: "", password: "", uf: "", whatsapp: "", city: "" },
    });
    useEffect(() => {
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);
    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCitiesNames(cityNames);
        });
    }, [selectedUf]);
    function handleSelectUf(event) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }
    function handleSelectCity(event) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    async function handleRegister({ name, email, password, uf, whatsapp, city }, e) {
        e.preventDefault();
        const dataOng = {
            name,
            email,
            password,
            whatsapp,
            city,
            uf
        };

        try {
            console.log(dataOng);
            await api.post('/register_ongs', dataOng);
            alert("Cadastro Realizado Com Sucesso.");
            navigate('/');
        } catch (error) {
            for (const status in error.response.data) {
                alert(status + ': ' + error.response.data[status]);
            }
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p> Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <input placeholder="Nome da ONG"
                        {...register('name', { required: true })}
                    />
                    <input type="email" placeholder="E-mail"
                        {...register('email', { required: true })}
                    />
                    <input type="password" placeholder="Senha"
                        {...register('password', { required: true })}
                    />
                    <input placeholder="Whatsapp"
                        {...register('whatsapp', { required: true })}
                    />
                    <div className="input-group">
                        <select id="uf" style={{ width: 90 }}
                            value={selectedUf}
                            {...register('uf', { required: true })}
                            onChange={handleSelectUf}>
                            <option value="0">UF</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                        <select
                            id="city"
                            {...register('city', { required: true })}
                            onChange={handleSelectCity} >
                            <option value="0">Selecione uma Cidade</option>
                            {
                                citiesNames.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                        </select>

                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}