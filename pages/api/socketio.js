import Server from 'socket.io-client';

const ioHandler = (req, res) => {
    console.log('*****')
    if (!res.socket.server.io) {
        console.log('*First use, starting socket.io')

        const io = new Server(res.socket.server)

        // fake DB
        const messages = {
            chat1: [],
            chat2: [],
        }


        // socket.io server
        // socket.io server
        io.on('connection', socket => {
            socket.on('message.chat1', data => {
                messages['chat1'].push(data)
                socket.broadcast.emit('message.chat1', data)
            })
            socket.on('message.chat2', data => {
                messages['chat2'].push(data)
                socket.broadcast.emit('message.chat2', data)
            })
        })


        // io.on('connection', socket => {
        //     socket.broadcast.emit('a user connected')
        //     socket.on('hello', msg => {
        //         socket.emit('hello', 'world!')
        //     })
        // })

        res.socket.server.io = io
    } else {
        console.log('socket.io already running')
    }
    res.end()
}

export const config = {
    api: {
        bodyParser: false
    }
}

export default ioHandler