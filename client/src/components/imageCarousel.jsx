import React from 'react';
import { Carousel } from 'react-bootstrap';

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Carousel>
        {
          this.props.images.map((image, i) => {
            return (
              <Carousel.Item key={i}>
                <img style={styles.image} width={840} height={384} src={image.url}/>
                <Carousel.Caption>
                  <h2>{image.caption}</h2>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })
        }
    </Carousel>
    )
  }
}

export default ImageCarousel;

let styles = {
  image: {
    margin: "auto"
  }
}