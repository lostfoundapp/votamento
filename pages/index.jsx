import React, { useState, useEffect } from 'react';
import { Layout, List, Input } from 'antd';
import axios from 'axios'
import swal from 'sweetalert';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Header, Footer, Content } = Layout;
const IndexPage = () => {
  const [stories, setStories] = useState([])

  const url = process.env.SEARCH_URL
  const searchStories = async filename => {
    console.log(filename)
    const data = {
      xtrip: process.env.X_TRIP,
      id: process.env.I_D,
      username: filename
    };
    console.log(url)
    await axios.post(process.env.SEARCH_URL, { data })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }
  return (
    <>
      <Layout style={{ width: '100vw', background: '#FFF', textAlign: 'center' }}>
        <Header
          style={{ width: '100vw', background: '#FFF' }}
          className="header-insta">
          Instagram Stories
      </Header>
        <Content
          style={{ width: '100vw', background: '#FFF', overflow: 'auto' }}
          className="content-insta">
          <Search
            className="input-button"
            placeholder="input search text"
            onSearch={(e) => { searchStories(e) }}
            allowClear
            enterButton
          />
          {
            stories.length > 0 &&
            <List

              dataSource={stories}
              renderItem={item => (
                <List.Item>

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
    </>
  )
}

export default IndexPage;
