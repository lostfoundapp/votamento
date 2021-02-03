import React, { useState } from 'react'
import { Layout, List, Input, Modal, Form, Button } from 'antd';
import axios from 'axios'

const { Search } = Input;
const { Header, Footer, Content } = Layout;
export default function consultaPlaca() {
    const [state, setState] = useState('')
    const handleVehiclePlate = async (value) => {

        const res = await axios.get(`/api/placa/${value}`)
        if (res.data) {
            const data = Object.entries(res.data);
            setState(data)
        }
    }
    return (
        <Layout style={{ width: '100vw', background: '#FFF', textAlign: 'center' }}>
            <Header
                style={{ width: '100vw', background: '#FFF' }}
                className="header-insta">
                Consulta pela placa
            </Header>
            <Content
                style={{ width: '100vw', background: '#FFF', overflow: 'auto' }}
                className="content-insta">
                <Search
                    className="input-button"
                    placeholder="Digite a placa"
                    onSearch={(e) => { handleVehiclePlate(e) }}
                    enterButton
                />
                {
                    state &&
                    <List
                        className="list-placa"
                        style={{ display: 'flex', flexDirection: 'column' }}
                        dataSource={state}
                        renderItem={item =>
                            item[0] !== 'data' && item[1] !== '' && (
                                <List.Item >
                                    {item[0]}: <strong> {item[1]}</strong>
                                </List.Item>
                            )}
                    />
                }
            </Content>
            <Footer
                style={{ width: '100vw', background: '#FFF' }}
                className="footer-insta">
                Creator by Nailson Melo - 2021
      </Footer>
        </Layout>
    )
}
