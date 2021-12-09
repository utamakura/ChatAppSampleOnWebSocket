import React, { useRef, useState, useEffect } from "react";

import Header from './Header';
import Footer from './Footer';
import {
    Container,
} from 'react-bootstrap';

// socket.io-client
import { io } from "socket.io-client";

// chat-ui-kit-react
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    Avatar
} from "@chatscope/chat-ui-kit-react";
import userIconBlue from '../images/figure_one_blue.png';
import userIconGreen from '../images/figure_one_green.png';

// 現在の表示メッセージ
let currentMessages = [];

// WebSocket通信のサーバURL
const SERVER = "https://localhost:8443";
// const SERVER = "https://xxx.xxx.xxx.xxx:8443"
let socket = null;
let sender = "default";

function Chat() {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        (async () => {
            console.log('Chat : useEffect()');

            socket = io(SERVER);
            socket.on('connection', () => {
                console.log('start connection. socket.id=' + socket.id);
                sender = socket.id;
            });

            socket.on('message', (res) => {
                console.log('receive message.');

                if (res) {
                    let object = isJSON(res) ? JSON.parse(res) : res;
                    console.log('Chat : useEffect() : message : object=' + JSON.stringify(object));
                    currentMessages.push(createMessageElement(object, currentMessages.length));
                    console.log('Chat : useEffect() : message : currentMessages=' + JSON.stringify(currentMessages));

                    // 配列のディープコピー
                    const newMessages = Array.from(currentMessages);

                    console.log('Chat : useEffect() : message : newMessages=' + JSON.stringify(newMessages));
                    setMessages(newMessages);
                }
            });
        })();
    }, []);

    // メッセージの要素作成
    const createMessageElement = (item, index) => {
        return (
            <Message
                key={index}
                model={{
                    message: item.message,
                    sentTime: "" + item.sentTime,
                    sender: "" + item.sender,
                    direction: (item.sender === socket.id ? 'incoming' : 'outgoing')
                }}>
                <Avatar src={(item.sender === socket.id ? userIconBlue : userIconGreen)} name={item.sender} />
            </Message>
        );
    };

    // JSON書式かどうか
    const isJSON = (item) => {
        try {
            JSON.parse( item );
            return true;
        } catch (error) {
            return false;
        }
    };

    const sendMessage = (innerHtml, textContent, innerText, nodes) => {
        console.log('Chat : sendMessage()');
        console.log('innerHtml : ' + innerHtml + ' : textContent : ' + textContent + ' : innerText : ' + textContent + ' : nodes : ' + JSON.stringify(nodes));

        socket.emit('sendMessage', {
            message: innerHtml,
            sentTime: new Date().getTime(),
            sender: socket.id,
        });
    };

    return (
        <>
            <Header />

            <Container className="chat_container">

                <p className="h3">Chat</p>

                <MainContainer>
                    <ChatContainer>
                        <MessageList>
                            {messages}
                        </MessageList>
                        <MessageInput id="message_input" placeholder="メッセージを入力" attachButton={false} onSend={sendMessage} />
                    </ChatContainer>
                </MainContainer>

            </Container>

            <Footer />
        </>
    );
}

export default Chat;
