import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import useSWR from 'swr';
import { List, Avatar } from 'antd';
import api from '../utils/api';
import apiCandidatos from '../utils/candidatos'

interface Politico {
    politico: string;
}

const Apuracao: NextPage = () => {
    const { data, error } = useSWR(`/api/politico`, api);

    const [candidatos, setCandidatos] = useState([])
    const [votos, setVotos] = useState([])

    useEffect(() => {
        if (data) {
            setVotos(data.data)
        }
        setCandidatos(apiCandidatos);
    }, [data])

    return (
        <div>
            <h1 className="resultado-votamento">Resultado da votação</h1>
            <List
                className="lista-resultado"
                itemLayout="horizontal"
                dataSource={candidatos}
                renderItem={item => (
                    <List.Item className="lista-item">
                        <List.Item.Meta
                            avatar={<Avatar className="avatar" src={item.image} />}
                            title={item.name}
                            description={`Votos: ${votos.filter(x => x.politico === item.id).length}`}
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

export default Apuracao;
