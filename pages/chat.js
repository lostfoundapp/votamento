import { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Blah() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState([]);
    const [toastmsg, setToastMsg] = useState('');
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on("message.chat1", message => {
                setMessages(messages => [...messages, message]);
                setToastMsg(message)
            });
        }
    }, [socket]);

    useEffect(() => {
        if (toastmsg) {
            myToast()
        }
    }, [toastmsg]);

    function submit(e) {
        e.preventDefault();

        socket &&
            socket.emit("message.chat1", {
                id: new Date().getTime(),
                value: message
            });

        setMessage('')
    }

    function myToast() {
        var x = document.getElementById("snackbar");
        if (x) {
            x.className = "show";
            setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            //alignItems: 'center',
            flexDirection: 'column',
            marginTop: 15,
            paddingLeft: 20,
            paddingRight: 20,
            width: '100%'
        }}>
            <form
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}
                onSubmit={submit}>
                <input
                    style={{ border: '0.5px solid #c1c1c1', width: '70%' }}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button
                    style={{ backgroundColor: '#0f3fdb', color: '#FFF', borderRadius: 5, width: '25%' }}
                >
                    submit
                    </button>
            </form>
            <ul
                style={{ width: '50%', marginTop: 20 }}
            >
                {messages.map(msg => (
                    <li
                        style={{ backgroundColor: '#0fdbb2', color: '#FFF', marginBottom: 5, borderRadius: 8, padding: 10 }}
                        key={msg.id}>{msg.value}</li>
                ))}
            </ul>
            {toastmsg && <div id="snackbar">{toastmsg.value}</div>}
        </div>
    );
}