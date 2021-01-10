const Instagram = require('instagram-web-api')


export default async (req, res) => {

    const username = req.body.username
    const login = req.body.login
    const password = req.body.password

    const client = new Instagram({ username: login, password: password })
    const user = await client.login()

    if (req.method === 'POST') {
        try {
            const instagram = await client.getUserByUsername({ username: username })
            res.status(200).json(instagram);

        } catch (error) {
            console.log('ERROR: ', error);
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({ error: 'Wrong request method' });
    }
}
