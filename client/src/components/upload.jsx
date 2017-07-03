import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import $ from 'jquery';
import {Modal, Button, Radio, FormGroup} from 'react-bootstrap';
const cloud = require('../../../server/config.js');
const helpers = require('../../../server/helpers');

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: '',
      imageScanned: false,
      imageScanResults: [],
      selectedImage: '',
      percentage: 0
    };
    this.clarifai = this.clarifai.bind(this);
    this.handlePercentage = this.handlePercentage.bind(this);
  }

  handlePercentage() {
    this.props.changePercentage(this.state.percentage);
  }

  getInitialState() {
    return { imageScanned: false };
  }

  close() {
    this.setState({
      imageScanned: false,
      imageScanResults: []
    });
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        item: this.state.selectedImage,
        choices: helpers.preferences(this.props.preferences) || null,
        url: this.state.uploadedFileCloudinaryUrl
      },
      success: data => {
        setTimeout(function(){ this.setState({ percentage: 100 }) }.bind(this), 0);
        setTimeout(function(){ this.handlePercentage() }.bind(this), 10);
        setTimeout(function(){ this.props.setPairings(data); }.bind(this), 20);

      }
    });
    $.ajax({
      url: '/saveImage',
      method: 'POST',
      data: {
        item: this.state.selectedImage,
        url: this.state.uploadedFileCloudinaryUrl
      },
      success: data => {
        console.log('image saved');
      }
    })
  }

  open() {
    this.setState({ imageScanned: true });
  }

  handleChange(e, food) {
    //
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percentage: 10 })} }.bind(this), 0);
    setTimeout(function(){ this.handlePercentage() }.bind(this), 500);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percentage: 25 })} }.bind(this), 501);
    setTimeout(function(){ this.handlePercentage() }.bind(this), 1000);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percentage: 50 })} }.bind(this), 1001);
    setTimeout(function(){ this.handlePercentage() }.bind(this), 1500);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percentage: 65 })} }.bind(this), 1501);
    setTimeout(function(){ this.handlePercentage() }.bind(this), 2000);
    setTimeout(function(){ if(this.state.percent != 100){this.setState({ percentage: 80 })} }.bind(this), 2001);
    setTimeout(function(){ this.handlePercentage() }.bind(this), 3000);
    this.setState({ selectedImage: e.target.value }, this.close);
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(cloud.CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', cloud.CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.log('error: ', err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        this.clarifai();
      }
    });
  }

  clarifai() {
    console.log('selected image: ', this.state.selectedImage);
    $.ajax({
      url: '/clarifai',
      method: 'POST',
      data: {
        url: this.state.uploadedFileCloudinaryUrl,
        caption: this.state.selectedImage
      },
      success: result => {
        this.setState({
          imageScanned: true,
          imageScanResults: result,
          selectedImage: result[0]
        })
        console.log('clarifai results: ', result);
      }
    });
  }

  render() {
    return (
      <div>
        <form>
          <div className="FileUpload">
            <Dropzone
              style={styles.dropzone}
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <img style={styles.image} src="http://www.iconsdb.com/icons/preview/white/screenshot-xxl.png"></img>
            </Dropzone>
          </div>
        </form>
        <div>
          <Modal show={this.state.imageScanned} onHide={this.close.bind(this)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Select the food in the picture</h4>
                  {
                    this.state.imageScanResults.slice(0,15).map((food, i) => {
                      return <Button style={styles.selectFoodBtn} bsSize="large" key={i} onClick={this.handleChange.bind(this)} value={food}>{food}</Button>
                    })
                  }
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

let styles = {
  image: {
    height: '100%',
  },
  dropzone: {
    width : '75px',
    height : '75px',
  },
  selectFoodBtn: {
    margin: '5px',

  }
};

