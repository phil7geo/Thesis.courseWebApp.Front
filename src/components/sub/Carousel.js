import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../../styles/Carousel.css';

const CustomCarousel = ({ items }) => {

    return (
        <Carousel>
            {items.map((item, index) => (
                <Carousel.Item key={index}>
                    <img
                        className="d-block w-100"
                        src={item.src}
                        alt={`Slide ${index}`}
                    />
                    <Carousel.Caption>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default CustomCarousel;
