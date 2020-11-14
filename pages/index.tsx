import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Row, Col, Card } from 'antd';
import { MdTouchApp } from 'react-icons/md';
import Nav from '../components/nav';
import axios from 'axios'
import apiCandidatos from '../utils/candidatos'
import swal from 'sweetalert';

const { Meta } = Card;

const IndexPage: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [candidatos, setCandidatos] = useState([])

  useEffect(() => {
    setCandidatos(apiCandidatos);
  }, [])

  const votar = async id => {
    const token = await localStorage.getItem("id")
    const da = {
      politico: id
    }
    if (token) {
      swal("Você já votou!!!", "Aguarde o resultado", "info"); 
    } else {
      const res = await axios.post('/api/vote', da)
      if (res) {
        localStorage.setItem("id", res.data._id)
        swal("Voto confirmado", "Obrigado por participar do votamento", "success"); 
      }

    }

  }
  return (
    <>
      <Nav />
      <div className="flex-box">
        <Row >
          {
            candidatos.map(candidato => {
              return (
                <Col xl={6} key={candidato.id}>
                  <Card
                    className="card-box"
                    cover={<img alt={candidato.name} src={candidato.image} />}
                  >
                    <Row gutter={24}>
                      <Col span={18}>
                        <Meta title={candidato.name} />
                      </Col>
                      <Col span={6}>
                        <MdTouchApp color="#19612e" size={30} onClick={() => votar(candidato.id)} className="btn-votar" />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              )
            })
          }
        </Row>
      </div>
    </>
  )
}

export default IndexPage;
