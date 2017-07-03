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
          this.props.images.reverse().map((image, i) => {
            return (
              <Carousel.Item key={i}>
                <img style={styles.image} width={840} height={384} alt="900x500" src={image.url}/>
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
        // <Carousel.Item>
        //   <img style={styles.image} width={580} height={384} alt="900x500" src={this.state.image}/>
        //   <Carousel.Caption>
        //     <h3>Second slide label</h3>
        //     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        //   </Carousel.Caption>
        // </Carousel.Item>
        // <Carousel.Item>
        //   <img style={styles.image} width={580} height={384} alt="900x500" src={this.state.image}/>
        //   <Carousel.Caption>
        //     <h3>Third slide label</h3>
        //     <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        //   </Carousel.Caption>
        // </Carousel.Item>