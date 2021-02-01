import { useEffect } from 'react'
import io from 'socket.io-client'


const socket = io()

export default function useSocket(eventName, cb) {
  useEffect(() => {
    fetch('/api/socketio').finally(() => {

      socket.on(eventName, cb)

      return function useSocketCleanup() {
        socket.off(eventName, cb)
      }
    }, [eventName, cb])

    socket.on('connect', () => {
      console.log('connect')
      socket.emit('hello')
    })

    socket.on('hello', data => {
      console.log('hello', data)
    })

    socket.on('a user connected', () => {
      console.log('a user connected')
    })

    socket.on('disconnect', () => {
      console.log('disconnect')
    })
  })
  return socket
}