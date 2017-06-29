import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import $ from 'jquery';
const cloud = require('../../../server/config.js');

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFileCloudinaryUrl: ''
    };
    this.clarifai = this.clarifai.bind(this);
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
        console.log('result: ', result);
        this.props.setPairings(result);
      }
    });
  }

  render() {
    return (
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
    )
  }
}

let styles = {
  dropzone: {
    width : '100%',
    height : '75px',
    marginBottom : '10px',
    border : '1px dashed black',
    textAlign : 'center'
  }
}

