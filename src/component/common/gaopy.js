import React, { useState, useEffect, useRef } from 'react';
import { Button,Select,Modal, message} from 'antd';

import stl from './index.css'
import temppic from "./photo.png"

import { camPhoto, LoadCameraDocument, WebSocketConnect, CloseConnect } from "./socket"

import CNF from '../../config'

function Gpy(props){
    const gpyEl = useRef(null);

    let {pto, setPto} = props

    //console.log(pto)

    const [gpy, setGpy] = useState("");

    const socketio = (flag, imgPathStr, base64Str)=>{
      if(flag == 0 && base64Str && props.visible){
        setGpy(base64Str)
      }
    }

    const takePhotoClick = () => {
      camPhoto("");
    };

    useEffect(()=>{

      //console.log("1-----------")
      if(!gpyEl.current.childNodes[0] && props.visible){
        //console.log("2-----------")
        LoadCameraDocument(gpyEl.current)
        WebSocketConnect(CNF.SOCKET, socketio)
      }

    })

    const closeSocket = ()=>{
      //清空
      setGpy("")

      if(props.resetItem){
        props.resetItem()
      }

      CloseConnect()
      if(gpyEl.current.childNodes[0]){
        gpyEl.current.removeChild(gpyEl.current.childNodes[0]);
      }
      props.hideModal();

    }

    const gpyStore = ()=>{

      // if(!gpy){
      //
      // }

      setPto({
        ...pto,
        photo: gpy
      });

      //清空
      setGpy("")

      CloseConnect()
      if(gpyEl.current.childNodes[0]){
        gpyEl.current.removeChild(gpyEl.current.childNodes[0]);
      }
      props.hideModal();

    }

    return (
      <>
        <div className={stl.copperDiv}>
          <div className={stl.copperDom} ref={gpyEl}></div>
          <div><img className={stl.copperImg} src={gpy ? "data:image/jpg;base64," + gpy : temppic} /></div>
        </div>

        <div className={stl.copperBtn}>
          <Button type="primary" onClick={takePhotoClick}>拍照</Button>
          <Button onClick={gpyStore}>保存</Button>
          <Button type="primary" onClick={closeSocket}>取消</Button>
        </div>
      </>
    );
}

export default Gpy;
