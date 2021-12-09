import Header from './Header';
import Footer from './Footer';
import {
    Container,
    Card,
} from 'react-bootstrap';

import React from "react";

function News() {
    return (
        <>
            <Header />

            <Container>

                <p className="h3">News</p>

                <Card>
                    <Card.Body>Newsだよ</Card.Body>
                </Card>

            </Container>

            <Footer />
        </>
    );
}

export default News;
