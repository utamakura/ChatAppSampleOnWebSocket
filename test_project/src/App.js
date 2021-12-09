import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

// スタイルシート
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from "./components/Home";
import News from "./components/News";
import Chat from "./components/Chat";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/News" element={<News />} />
                <Route path="/Chat" element={<Chat />} />
            </Routes>
        </Router>
    );
}

export default App;
