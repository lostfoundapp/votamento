const Instagram = require('instagram-web-api')


export default async (req, res) => {
  const login = req.body.login
  const password = req.body.password
  const client = new Instagram({ username: login, password: password })
  const user = await client.login()

  if (req.method === 'POST') {
    try {
      const shortcode = req.body.shortcode;
      let dados = []
      const data = await getComments(client, shortcode, '')
      data.edges.forEach(item => {
        dados.push(item)
      })
      let hasNextPage = data.page_info.has_next_page;
      let endCursor = data.page_info.end_cursor;

      while (hasNextPage) {
        const dataPage = await getComments(client, shortcode, endCursor)
        dataPage.edges.forEach(element => {
          dados.push(element)
        });
        endCursor = dataPage.page_info.end_cursor;
        hasNextPage = dataPage.page_info.has_next_page;
        console.log(Date())
      }

      res.status(200).json({ dataRest: dados });
    } catch (error) {
      console.log('ERROR: ', error);
    }
  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
}

const getComments = async (client, shortcode, endCursor) => {


  const result = await client.getMediaComments({ shortcode: shortcode, first: '50', after: endCursor }).catch((error) => {
    console.log(error);
  })
    .then((response) => {
      return response
    });
  return result;
}