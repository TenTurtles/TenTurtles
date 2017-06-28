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
        console.log(err);
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
      success: function(result) {
        console.log(result);
      }
    });
  }

  render() {
    return (
      <form>
        <div className="FileUpload">
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}>
            <p>Drop an image or click to select a file to upload.</p>
          </Dropzone>
        </div>
      </form>
    )
  }
}

