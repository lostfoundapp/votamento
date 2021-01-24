import React, { useState, useEffect } from 'react';
import { Layout, List, Input, Modal, Form, Button } from 'antd';
import axios from 'axios'
import { MdTouchApp } from 'react-icons/md';
import swal from 'sweetalert';

const { Search } = Input;
const { Header, Footer, Content } = Layout;
const IndexPage = () => {
  const [feeds, setFeeds] = useState([])
  const [userName, setUserName] = useState('')
  const [isVisible, setTIsVisible] = useState(false)
  const [isVisibleUser, setTIsVisibleUser] = useState(false)
  const [urlModal, setTUrlModal] = useState('')
  const [isVideo, setTIsVideo] = useState(false)
  const [shortCode, setShortCode] = useState('')


  useEffect(() => {
    const userName = localStorage.getItem('userName');
    const password = localStorage.getItem('password');

    if (!userName || !password) {
      setTIsVisibleUser(true)
    }
  }, [])
  const searchFeeds = async (filename) => {
    const userName = localStorage.getItem('userName');
    const password = localStorage.getItem('password');

    if (userName && password) {
      const data = {
        username: filename,
        login: userName,
        password: password
      }
      const res = await axios.post(`api/feeds`, data)
      console.log(res.data)
      if (res) {
        setUserName(res.data.full_name)
        setFeeds(res.data.edge_owner_to_timeline_media.edges)
      }
    } else {
      setTIsVisibleUser(true)
    }
  }

  const openModal = item => {
    setTIsVisible(true)
    console.log(item.node.is_video)
    if (item.node.is_video) {
      setTUrlModal(item.node.video_url)
      let vid = document.getElementById("myVideo");
      if (vid) {
        vid.autoplay = true;
        vid.load();
      }
    } else {
      setTUrlModal(item.node.display_url)
    }
    setTIsVideo(item.node.is_video)
    setShortCode(item.node.shortcode)
  }

  const onFinish = (values) => {
    localStorage.setItem('userName', values.username);
    localStorage.setItem('password', values.password);
    setTIsVisibleUser(!isVisibleUser)
  };

  const handleComments = async () => {
    const userName = localStorage.getItem('userName');
    const password = localStorage.getItem('password');

    if (userName && password) {
      const data = {
        shortcode: shortCode,
        login: userName,
        password: password
      }
      const res = await axios.post(`api/comments`, data)
      console.log(res.data)
      console.log(data)
      swal("Aguarde!!!", "Estamos baixando os comentários, assim que finalizar vc será avisado...", "success"); 

    } else {
      setTIsVisibleUser(true)
    }
  }

  return (
    <>
      <Layout style={{ width: '100vw', background: '#FFF', textAlign: 'center' }}>
        <Header
          style={{ width: '100vw', background: '#FFF' }}
          className="header-insta">
          Instagram Comments
      </Header>
        <Content
          style={{ width: '100vw', background: '#FFF', overflow: 'auto' }}
          className="content-insta">
          <Search
            className="input-button"
            placeholder="Digite o usuario"
            onSearch={(e) => { searchFeeds(e) }}
            allowClear
            enterButton
          />
          {
            feeds.length > 0 &&
            <List

              dataSource={feeds}
              renderItem={item => (
                <List.Item onClick={() => openModal(item)}>{console.log(item)}
                  <img src={item.node.thumbnail_resources[0].src} alt={item.node.accessibility_caption} />
                  {/* {String(item.node.is_video)} */}
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

      <Modal
        className="view-timeline"
        visible={isVisible}
        onCancel={() => {
          setTIsVisible(!isVisible)
          if (isVideo) {
            let vids = document.getElementById("myVideo");
            vids.pause();
            //vids.autoplay = false;
            //vids.load();
          }
        }}
      >
        {isVideo ?
          <video controls autoPlay name="media" id="myVideo">
            <source src={urlModal} type="video/mp4" />
          </video>
          :
          <img className="img-modal" src={urlModal} alt={userName} />
        }

        <div     
        onClick={() => handleComments()}
        className="btn-comments">
          <MdTouchApp
            color="#FFF"
            size={40}
          />
        </div>

      </Modal>

      <Modal
        title="Login"
        className="modal-login"
        visible={isVisibleUser}
        onCancel={() => setTIsVisibleUser(!isVisibleUser)}
      >

        <Form
          name="Login"
          onFinish={onFinish}
        //onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Para continuar insira o username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Para continuar insira o password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Logar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default IndexPage;
