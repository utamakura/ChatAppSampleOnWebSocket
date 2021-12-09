import React from "react";

import Header from './Header';
import Footer from './Footer';
import {
    Container,
    Card,
} from 'react-bootstrap';

function Home() {
    return (
        <>
            <Header />

            <Container>

                <p className="h3">Home</p>

                <Card>
                    <Card.Body>Homeだよ</Card.Body>
                </Card>

            </Container>

            <Footer />
        </>
    );
}

export default Home;
