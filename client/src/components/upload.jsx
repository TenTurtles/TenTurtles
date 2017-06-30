import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import $ from 'jquery';
import {Modal, Button, Radio, FormGroup} from 'react-bootstrap';
const cloud = require('../../../server/config.js');
const prefHelper = require('../../../server/preferenceRefactor');

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: '',
      imageScanned: false,
      imageScanResults: [],
      selectedImage: ''
    };
    this.clarifai = this.clarifai.bind(this);
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
        choices: prefHelper.preferences(this.props.preferences) || null
      },
      success: data => {
        console.log('success', data);
        this.props.setPairings(data);
      }
    });
  }

  open() {
    this.setState({ imageScanned: true });
  }

  handleChange(e, food) {
    console.log('handleChange e: ', e.target.value);
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
    $.ajax({
      url: '/clarifai',
      method: 'POST',
      data: {
        url: this.state.uploadedFileCloudinaryUrl
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
              <p>tap or click to search an image</p>
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
                    this.state.imageScanResults.slice(0,5).map((food, i) => {
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
  dropzone: {
    fontSize: '35px',
    width : '100%',
    height : '75px',
    marginBottom : '10px',
    border : '1px dashed black',
    textAlign : 'center'
  },
  selectFoodBtn: {
    marginRight: '10px'
  }
};

