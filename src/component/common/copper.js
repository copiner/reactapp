/*
剪裁图像  未用到
*/

import React, { Component } from 'react';
import { Button,Divider } from 'antd';
import Cropper  from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import pic from './qr.png'

import stl from './index.css'
import { camPhoto, LoadCameraDocument, WebSocketConnect,CloseConnect } from "./socket"

class Copp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          gpy:""
        }
    }

    crop =()=>{
      //this.cropper.setCropBoxData({top:0,width:178,height:220})
      //this.cropper.setCropBoxData({top:0,width:100,height:200})
      //console.log(this.cropper.getData())
      console.log(this.cropper.getCroppedCanvas().toDataURL());
    }

    onCropperInit=(cropper) => {
        this.cropper = cropper;
    }

    takePhotoClick = () => {
      camPhoto("");
    };

    closeSocket = ()=>{
      CloseConnect()
      this.props.hideModal();
    }

    socketio = (flag, imgPathStr, base64Str)=>{
      this.setState({
        gpy: base64Str
      })
    }

    openSocket = () => {
      WebSocketConnect(this.socketio)
    }

    render() {
      //console.log(this.props.hideModal)
      console.log(this.state.gpy)
      //"data:image/png;base64," + this.state.gpy
      return (
        <>
          <Cropper
            className={stl.copperBox}
            src={pic}
            // Cropper.js options
            guides={false}
            // initialAspectRatio={16 / 9}
            // crop={this.crop}
            // center={false}
            // minCropBoxWidth={600}
            // minCropBoxHeight={400}
            autoCrop={true}
            data={{ x:200,y:50,width:178,height:220 }}
            movable={true}
            cropBoxResizable={false}
            onInitialized={this.onCropperInit}
            />
            <div className={stl.copperBtn}>
              <Button onClick={this.openSocket}>开启</Button>
              <Button type="primary" onClick={this.takePhotoClick}>拍照</Button>
              <Button onClick={this.closeSocket}>取消</Button>
              <Button type="primary" onClick={this.crop}>保存</Button>
            </div>
        </>
        );


    }

    componentDidMount(){
      //WebSocketConnect(this.socketio)
    }

    componentWillUnmount(){
      CloseConnect()
    }
}

export default Copp;
