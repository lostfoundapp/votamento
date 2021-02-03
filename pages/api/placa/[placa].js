import sinespApi from 'sinesp-api'

const placas = async (req, res) => {
    const { placa } = req.query
    console.log("==> ", placa)
    if (req.method === 'GET') {

        const vehicle = await sinespApi.search(placa)
            .catch(error => {
                return res.status(200).json({ message: "Placa não encontrada..." });
            })
        if (vehicle) {
            return res.status(200).json(vehicle);
        }

    } else {
        res.status(400).json({ error: 'Wrong request method' });
    }
}

export default placas