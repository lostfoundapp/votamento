import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";

import { Layout, List, Input, Modal, Form, Button } from 'antd';

const DynamicReactCompare = dynamic(() => import('react-json-view-compare'), {
  ssr: false,
});

const DynamicReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
});

const { Search, TextArea } = Input;
const { Header, Footer, Content } = Layout;


const IndexPage = () => {

  const [inputCompare1, setInputCompare1] = useState('')
  const [inputCompare2, setInputCompare2] = useState('')

  const [inputFormatter, setInputFormatter] = useState([])

  const [isVisibleFormatter, setIsVisibleFormatter] = useState(false)
  const [isVisibleCompare, setTIsVisibleCompare] = useState(false)
  const [isCompare, setIsCompare] = useState(false)

  const handleFormatter = value => {
    setInputFormatter(value ? JSON.parse(value) : {})
  }

  const handleCompare1 = value => {
    setInputCompare1(value ? JSON.parse(value) : [])
    console.log(inputCompare1, inputCompare2)
  }

  const handleCompare2 = value => {
    setInputCompare2(value ? JSON.parse(value) : [])
  }
  const handleCompare = () => {
    if (inputCompare1.length > 0 && inputCompare2.length > 0) {
      setTIsVisibleCompare(true)
    }
  }

  return (
    <>
      <Layout style={{ width: '100vw', background: '#FFF' }}>
        <Header
          style={{ width: '100vw', background: '#FFF', textAlign: 'center' }}
          className="header-insta">
          Json Formatter and Compare
      </Header>
        <Content
          style={{ width: '100vw', background: '#FFF', overflow: 'auto' }}
          className="content-json">
          <div className="btn-compare">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setIsCompare(!isCompare)}
            >
              {!isCompare ? 'Comparar' : 'Formatar'}
            </Button>
          </div>
          <div className="div__json">
            {
              isCompare ? (
                <>
                  <div className="div__textarea">
                    <p>
                      Tipo: {inputFormatter.length ? `Array com ${inputFormatter.length === 1 ? inputFormatter.length + ' objeto' : inputFormatter.length + ' objetos'}` : 'objeto'}
                    </p>
                    <TextArea
                      placeholder='{
                        "key": "value"
                      };'
                      onChange={(e) => handleCompare1(e.target.value)}
                    />
                  </div>
                  <div className="div__textarea">
                    <p>
                      Tipo: {inputFormatter.length ? `Array com ${inputFormatter.length === 1 ? inputFormatter.length + ' objeto' : inputFormatter.length + ' objetos'}` : 'objeto'}
                    </p>
                    <TextArea
                      placeholder='{
                      "key": "value"
                    };'
                      onChange={(e) => handleCompare2(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                  <>
                    <div className="div__textarea">
                      <p>
                        Tipo: {inputFormatter.length ? `Array com ${inputFormatter.length === 1 ? inputFormatter.length + ' objeto' : inputFormatter.length + ' objetos'}` : 'objeto'}
                      </p>
                      <TextArea
                        placeholder='{
                  "key": "value"
                };'
                        onChange={(e) => handleFormatter(e.target.value)}
                      />
                    </div>{console.log(isCompare)}
                    <div className="div__result">
                      <p>Json Formatado</p>
                      <DynamicReactJson src={inputFormatter} theme="threezerotwofour" />
                    </div>
                  </>
                )
            }
          </div>
          {
            isCompare &&
            <Button
              className="btn__comparar"
              type="primary"
              htmlType="submit"
              onClick={() => handleCompare()}
            >
              Comparar agora
            </Button>
          }

          {/* <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: 5 }} >
                <DynamicReactJson src={state} theme="threezerotwofour" style={{ width: '45%' }} />
                <p style={{ fontWeight: 'bold', fontSize: 20, marginTop: 25, textAlign: 'center' }}>
                    {state && 'Is Matching'}
                    <br />
                    Tipo: {state1.length ? `Array de ${state1.length === 1 ? state1.length + ' objeto' : state1.length + ' objetos'}` : 'objeto'}
                </p>
                <DynamicReactJson src={state1} theme="threezerotwofour" style={{ width: '45%' }} />{console.log(state)}
            </div>
  
          <DynamicReactCompare oldData={state} newData={state1} /> */}

        </Content>
        <Footer
          style={{ width: '100vw', height: 50, background: '#FFF', textAlign: 'center' }}
          className="footer-insta">
          Creator by Nailson Melo - 2021
      </Footer>
      </Layout>

      <Modal
        title="Comparação"
        className="view-json"
        visible={isVisibleCompare}
        onCancel={() => setTIsVisibleCompare(!isVisibleCompare)}
      >
        {
          inputCompare1
          && <DynamicReactCompare oldData={inputCompare1} newData={inputCompare2} />
        }
      </Modal>

      <Modal
        title="Login"
        className="modal-login"
        visible={isVisibleFormatter}
        onCancel={() => setTIsVisibleUser(!isVisibleUser)}
      >

        <Form
          name="Login"
        //onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="comp1"
            rules={[{ required: true, message: 'Insira o json' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="comp2"
            rules={[{ required: true, message: 'Insira o json' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Comparar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default IndexPage;
