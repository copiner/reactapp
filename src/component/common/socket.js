
/*********************
***    初始化  ***
**********************/
function LoadCameraDocument(obj) {

  if (!window.WebSocket) {
      console.error("浏览器不支持HTML5,请更新浏览器或者使用其它浏览器");
  }
  //console.log("LoadCameraDocument");
  //var obj = null// document.getElementById("CameraCtl");
  Cam_ControlInit(obj,0, 0, 602, 400);
}

//高拍仪服务

//0->主摄像头      1->副摄像头


//gpyhs.js
var socket;
var isSocketConnect = false;
var openFlagA = false;

var isOpenMainCamera = false;

var MainCanvas;
var MainContext;

var pMainShowStartX = 0;
var pMainShowStartY = 0;

var isMouseDown = false;
var pALastX = 0;
var pALastY = 0;
var pACurrentX = 0;
var pACurrentY = 0;

var MainCamCutMode = 0;


function CloseConnect() {
   Cam_ControlInit(null, 0, 0, 602, 400);

   CloseCamera();  //关闭摄像头
   isSocketConnect = false;
   isOpenMainCamera = false;

   //释放socket
   var aDataArray = new Uint8Array(3);
   aDataArray[0] = 0x77;
   aDataArray[1] = 0x88;
   aDataArray[2] = 0xFF;
   socket && socket.send(aDataArray.buffer);

   socket && socket.close();
   socket = null;

}

function toSleep(milliSeconds) {
  var startTime = new Date().getTime();
  while (new Date().getTime() < startTime + milliSeconds);
}

function stringToUint8Array(str) {
  var arr = [];
  for (var i = 0, j = str.length; i < j; ++i) {
      arr.push(str.charCodeAt(i));
  }
  arr.push('\0');
  var tmpUint8Array = new Uint8Array(arr);
  return tmpUint8Array
}


function Uint8ArrayToString(fileData) {
  var dataString = "";
  for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
  }
  return dataString
}


function stringToByte(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
      c = str.charCodeAt(i);
      if (c >= 0x010000 && c <= 0x10FFFF) {
          bytes.push(((c >> 18) & 0x07) | 0xF0);
          bytes.push(((c >> 12) & 0x3F) | 0x80);
          bytes.push(((c >> 6) & 0x3F) | 0x80);
          bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000800 && c <= 0x00FFFF) {
          bytes.push(((c >> 12) & 0x0F) | 0xE0);
          bytes.push(((c >> 6) & 0x3F) | 0x80);
          bytes.push((c & 0x3F) | 0x80);
      } else if (c >= 0x000080 && c <= 0x0007FF) {
          bytes.push(((c >> 6) & 0x1F) | 0xC0);
          bytes.push((c & 0x3F) | 0x80);
      } else {
          bytes.push(c & 0xFF);
      }
  }
  return bytes;
}

function byteToString(arr) {
  if (typeof arr === 'string') {
      return arr;
  }
  var str = '',
          _arr = arr;
  for (var i = 0; i < _arr.length; i++) {
      var one = _arr[i].toString(2),
              v = one.match(/^1+?(?=0)/);
      if (v && one.length == 8) {
          var bytesLength = v[0].length;
          var store = _arr[i].toString(2).slice(7 - bytesLength);
          for (var st = 1; st < bytesLength; st++) {
              store += _arr[st + i].toString(2).slice(2);
          }
          str += String.fromCharCode(parseInt(store, 2));
          i += bytesLength - 1;
      } else {
          str += String.fromCharCode(_arr[i]);
      }
  }
  return str;
}

function addEvent(obj, xEvent, fn) {
  if (obj.attachEvent) {
      obj.attachEvent('on' + xEvent, fn);
  } else {
      obj.addEventListener(xEvent, fn, false);
  }
}


function InitCanvas(DivMainBox, mX, mY, mwidth, mheight) {

  //var DivMainBox = $("CameraCtl");

  if (mwidth != 0 && mheight != 0) {
      MainCanvas = document.createElement("canvas");
      MainCanvas.style.border = "solid 1px #A0A0A0";
      MainCanvas.id = "MainCamCanvas";
      MainCanvas.width = mwidth;
      MainCanvas.height = mheight;
      MainContext = MainCanvas.getContext("2d");
      if(DivMainBox){
        DivMainBox.appendChild(MainCanvas);      //添加画布
      }
      MainCanvas.onmousedown = MainCanvasMouseDown;
      MainCanvas.onmousemove = MainCanvasMouseMove;
      MainCanvas.onmouseup = MainCanvasMouseUp;
      MainCanvas.onmouseout = MainCanvasMouseOut;
      addEvent(MainCanvas, 'mousewheel', onMouseWheel);
      addEvent(MainCanvas, 'DOMMouseScroll', onMouseWheel);

  }

}


//*************摄像头操作初始化***************
function Cam_ControlInit(documentObj, mX, mY, mwidth, mheight) {
  //WebSocketConnect();
  InitCanvas(documentObj, mX, mY, mwidth, mheight);
  //console.log("Cam_ControlInit");
}


//*************获取设备数目***************
function Cam_GetDevCount() {
  GetDevCount();
}

//***************获取分辨率***************
function Cam_GetDevResolution(iCamNo) {
  GetResolution(iCamNo);
}

//*************打开主摄像头***************
function Cam_Open(iCamNo, width, height) {
   OpenCamera(iCamNo, width, height);
}



//*************拍照***************
function camPhoto(fileAddr) {
  console.log(isOpenMainCamera)
  if(isOpenMainCamera){

    if (MainCamCutMode == 2) {
        var rectx, recty, rectw, recth;
        if (pALastX > pACurrentX)
            rectx = pACurrentX;
        else
            rectx = pALastX;
        if (pALastY > pACurrentY)
            recty = pACurrentY;
        else
            recty = pALastY;
        rectw = Math.abs(pACurrentX - pALastX);
        recth = Math.abs(pACurrentY - pALastY);

        SetCutRect(rectx, recty, rectw, recth);  //手动裁剪区域
    }
   CaptureImage(fileAddr);

  }

}


//***********曝光*****************

function SetDefaultExposure(flag) {
  //flag 1 开启自动曝光 0 关闭自动曝光
    if (isSocketConnect) {
        var aDataArray = new Uint8Array(4);
        aDataArray[0] = 0x77;
        aDataArray[1] = 0x88;
        aDataArray[2] = 0xC9;
        aDataArray[3] = flag;
        socket.send(aDataArray.buffer);
    }
}

function GetExposureValue() {
    if (isSocketConnect) {
        var aDataArray = new Uint8Array(4);
        aDataArray[0] = 0x77;
        aDataArray[1] = 0x88;
        aDataArray[2] = 0xCA;
        aDataArray[3] = 0;
        socket.send(aDataArray.buffer);
    }
}

function SetManualExposure(flag) {
    if (isSocketConnect) {
        var aDataArray = new Uint8Array(4);
        aDataArray[0] = 0x77;
        aDataArray[1] = 0x88;
        aDataArray[2] = 0xCB;
        aDataArray[3] = flag;
        socket.send(aDataArray.buffer);
    }
}

//*************放大***************
function Cam_ZoomIn() {
  ZoomIn();
}

//*************缩小***************
function Cam_ZoomOut() {
  ZoomOut();
}

//*************适合大小***************
function Cam_BestSize() {
  BestSize();
}

//*************1:1***************
function Cam_TrueSize() {
  TrueSize();
}

//*************旋转***************
function Cam_Rotate(angle) {
  Rotate(angle);
}

//*************左旋***************
function Cam_RotateLeft() {
  RotateL();
}

//*************右旋***************
function Cam_RotateRight() {
  RotateR();
}

//*************对焦***************
function Cam_Focus() {
  ManualFocus();
}

//*************设置视频属性***************
function Cam_ShowVideoProp() {
  ShowVideoProp();
}

//*************设置裁剪模式***************
function Cam_SetCutMode(cutMode) {
  SetCutMode(cutMode);
}


//*************读取身份证信息*************
function Cam_ReadIdCard(cardImgPath) {
  ReadIdCard(cardImgPath);
}

//*************上传文件*************
function UploadFile(url, filepath) {
  toUploadFile(url, filepath);
}


//*************设置文件格式*************
function Cam_SetFileType(filetype) {
  SetFileType(filetype);
}

//*************设置JPG图片质量*************
function Cam_SetJpgQuality(val) {
  SetJpgQuality(val);
}


//*************设置色彩模式*************
function Cam_SetColorMode(colorMode) {
  SetColorMode(colorMode);
}

//*************设置去黑边*************
function Cam_SetDeleteBlackEdge(flag) {
  SetDeleteBlackEdge(flag);
}

//*************设置去底色*************
function Cam_SetDeleteBgColor(flag) {
  SetDeleteBgColor(flag);
}


//*************获取驱动盘符*************
function GetDrives() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(3);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xA6;
      socket.send(aDataArray.buffer);
  }
}

//*************设置水印*************
function SetWaterMark(isAdd, wType, addTime, wTransp, wPos, wSize, wColor, szInfo) {
  if (isSocketConnect) {
      if (szInfo == "")
          return;
      var info = encodeURI(szInfo);
      //console.log(info);
      var infoArray = stringToByte(info);
      var len = infoArray.length;
      var totalLen = len + 10;
      var aDataArray = new Uint8Array(totalLen);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xA7;
      aDataArray[3] = isAdd;
      aDataArray[4] = wType;
      aDataArray[5] = addTime;
      aDataArray[6] = wPos;
      aDataArray[7] = wSize;
      aDataArray[8] = wTransp;
      aDataArray[9] = wColor;
      for (var i = 0; i < len; i++) {
          aDataArray[10 + i] = infoArray[i];
      }
      socket.send(aDataArray.buffer);
  }
}


function ReadCamLicense() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(3);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xA5;
      socket.send(aDataArray.buffer);
  }
}

function SetInchImgType(sizetype) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xB0;
      aDataArray[3] = sizetype;
      socket.send(aDataArray.buffer);
  }
}

function SetInchLineType(linetype) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xB1;
      aDataArray[3] = linetype;
      socket.send(aDataArray.buffer);
  }
}


/****************************************************************************************/


function SetFileType(filetype) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x28;
      aDataArray[3] = filetype;
      if (filetype == 1)  //png格式
          aDataArray[3] = 2;
      if (filetype == 2)  //tif格式
          aDataArray[3] = 3;
      if (filetype == 3)  //pdf格式
          aDataArray[3] = 4;
      socket.send(aDataArray.buffer);
  }
}

function SetJpgQuality(val) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x29;
      aDataArray[3] = val;
      socket.send(aDataArray.buffer);
  }
}

function SetColorMode(colorMode) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xA0;
      aDataArray[3] = colorMode;
      socket.send(aDataArray.buffer);
  }
}


function SetDeleteBlackEdge(flag) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xA1;
      aDataArray[3] = flag;
      socket.send(aDataArray.buffer);
  }
}

function SetDeleteBgColor(flag) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0xA2;
      aDataArray[3] = flag;
      socket.send(aDataArray.buffer);
  }
}


function GetDevCount() {
  var aDataArray = new Uint8Array(3);
  aDataArray[0] = 0x77;
  aDataArray[1] = 0x88;
  aDataArray[2] = 0x50;
  socket.send(aDataArray.buffer);
}

function GetResolution(iCamNo) {
  var aDataArray = new Uint8Array(4);
  aDataArray[0] = 0x77;
  aDataArray[1] = 0x88;
  aDataArray[2] = 0x51;
  aDataArray[3] = iCamNo;
  socket.send(aDataArray.buffer);
}

function OpenCamera(iCamNo, width, height) {

  pALastX = 0;
  pALastY = 0;
  pACurrentX = 0;
  pACurrentY = 0;

  if (isSocketConnect) {
      var aDataArray = new Uint8Array(12);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x01;   //打开摄像头
      aDataArray[3] = iCamNo;
      aDataArray[4] = MainCanvas.width >> 8 & 0xff;
      aDataArray[5] = MainCanvas.width & 0xff;
      aDataArray[6] = MainCanvas.height >> 8 & 0xff;
      aDataArray[7] = MainCanvas.height & 0xff;
      aDataArray[8] = width >> 8 & 0xff;
      aDataArray[9] = width & 0xff;
      aDataArray[10] = height >> 8 & 0xff;
      aDataArray[11] = height & 0xff;

      socket.send(aDataArray.buffer);
  }
}

function CloseCamera() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x02;  //关闭摄像头
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}


function CaptureImage(fileAddr) {

  if (isSocketConnect) {

      // var pathArray = stringToUint8Array(fileAddr);
      if (fileAddr == "") {
          var packageCount = 1;
          var len = 0;
          var pindex = 0;
          var totalLen =  12;
          var aDataArray = new Uint8Array(totalLen);
          aDataArray[0] = 0x77;
          aDataArray[1] = 0x88;
          aDataArray[2] = 0x10;
          aDataArray[3] = 0x00;
          aDataArray[4] = len >> 16 & 0xff;
          aDataArray[5] = len >> 8 & 0xff;
          aDataArray[6] = len & 0xff;
          aDataArray[7] = packageCount >> 8 & 0xff;   //包总数
          aDataArray[8] = packageCount & 0xff;   //包总数
          aDataArray[9] = 0;   //分包长度
          aDataArray[10] = pindex >> 8 & 0xff;   //包序号
          aDataArray[11] = pindex & 0xff;    //包序号
          console.log("pindex:" + pindex);
          socket.send(aDataArray.buffer);//base64Str
      }
      else {
          var path = encodeURI(fileAddr);
          //console.log(path);
          var pathArray = stringToByte(path);
          var len = pathArray.length;

          var packageCount = 0;
          var tmpLen = len;
          while (tmpLen > 0) {
              tmpLen = tmpLen - 90;
              packageCount++;
          }

          console.log("packageCount:" + packageCount);

          var pindex = 0;
          tmpLen = len;
          while (tmpLen > 0) {
              tmpLen = tmpLen - 90;

              if (tmpLen > 0) {
                  var totalLen = 90 + 12;
                  var aDataArray = new Uint8Array(totalLen);
                  aDataArray[0] = 0x77;
                  aDataArray[1] = 0x88;
                  aDataArray[2] = 0x10;
                  aDataArray[3] = 0x00;
                  aDataArray[4] = len >> 16 & 0xff;
                  aDataArray[5] = len >> 8 & 0xff;
                  aDataArray[6] = len & 0xff;
                  aDataArray[7] = packageCount >> 8 & 0xff;   //包总数
                  aDataArray[8] = packageCount & 0xff;   //包总数
                  aDataArray[9] = 90;   //分包长度
                  aDataArray[10] = pindex >> 8 & 0xff;   //包序号
                  aDataArray[11] = pindex & 0xff;    //包序号
                  console.log("pindex:" + pindex);
                  for (var i = 0; i < 90; i++) {
                      aDataArray[12 + i] = pathArray[i + pindex * 90];
                  }
                  socket.send(aDataArray.buffer);
              }
              else {
                  var totalLen = 90 + tmpLen + 12;  // 此时tmpLen为负数，做加法运算
                  var aDataArray = new Uint8Array(totalLen);
                  aDataArray[0] = 0x77;
                  aDataArray[1] = 0x88;
                  aDataArray[2] = 0x10;
                  aDataArray[3] = 0x00;
                  aDataArray[4] = len >> 16 & 0xff;
                  aDataArray[5] = len >> 8 & 0xff;
                  aDataArray[6] = len & 0xff;
                  aDataArray[7] = packageCount >> 8 & 0xff;   //包总数
                  aDataArray[8] = packageCount & 0xff;   //包总数
                  aDataArray[9] = 90 + tmpLen;   //分包长度
                  aDataArray[10] = pindex >> 8 & 0xff;   //包序号
                  aDataArray[11] = pindex & 0xff;    //包序号
                  console.log("pindex:" + pindex);
                  for (var i = 0; i < (90 + tmpLen); i++) {
                      aDataArray[12 + i] = pathArray[i + pindex * 90];
                  }
                  socket.send(aDataArray.buffer);
              }
              pindex++;
              toSleep(80);
          }
       }

  }
}


function ZoomIn() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x03;  //放大
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}

function ZoomOut() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x04;  //缩小
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}

function BestSize() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x05;  //适合大小
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}

function TrueSize() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x06;  //1:1
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}


function Rotate(angle) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(5);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x78;
      aDataArray[3] = 0x00;
      if (angle > 3 || angle<0)
          angle=0;
      aDataArray[4] = angle;
      socket.send(aDataArray.buffer);
  }
}

function RotateL() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x07;  //左旋
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}

function RotateR() {
  if (isSocketConnect ) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x08;  //右旋
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}


function ManualFocus() {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x30;
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}


function SetCutMode(cutMode) {
  if (isSocketConnect) {

      MainCamCutMode = cutMode;
      var aDataArray = new Uint8Array(5);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x11;  //设置裁剪模式
      aDataArray[3] = 0x00;
      aDataArray[4] = cutMode;
      socket.send(aDataArray.buffer);
  }
}



function SetCutRect(rectX,rectY,rectW,rectH) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(12);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x13;  //设置裁剪模式
      aDataArray[3] = 0x00;
      aDataArray[4] = rectX >> 8 & 0xff;
      aDataArray[5] = rectX & 0xff;
      aDataArray[6] = rectY >> 8 & 0xff;
      aDataArray[7] = rectY & 0xff;
      aDataArray[8] = rectW >> 8 & 0xff;
      aDataArray[9] = rectW & 0xff;
      aDataArray[10] = rectH >> 8 & 0xff;
      aDataArray[11] = rectH & 0xff;

      //console.log(aDataArray[8] + "," + aDataArray[9]);

      socket.send(aDataArray.buffer);
  }
}


function SetCustomArea(iX1, iY1, iX2, iY2) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(12);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x23;  //设置自定义裁剪区域
      aDataArray[3] = 0x00;
      aDataArray[4] = iX1 >> 8 & 0xff;
      aDataArray[5] = iX1 & 0xff;
      aDataArray[6] = iY1 >> 8 & 0xff;
      aDataArray[7] = iY1 & 0xff;
      aDataArray[8] = iX2 >> 8 & 0xff;
      aDataArray[9] = iX2 & 0xff;
      aDataArray[10] = iY2 >> 8 & 0xff;
      aDataArray[11] = iY2 & 0xff;

      socket.send(aDataArray.buffer);
  }
}



function ShowVideoProp() {
   if (isSocketConnect ) {
      var aDataArray = new Uint8Array(4);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x12;  //设置视频属性
      aDataArray[3] = 0x00;
      socket.send(aDataArray.buffer);
  }
}


function MoveOffsetXY(px,py,xdir,ydir) {
  if (isSocketConnect) {
      var aDataArray = new Uint8Array(10);
      aDataArray[0] = 0x77;
      aDataArray[1] = 0x88;
      aDataArray[2] = 0x09;  //移动
      aDataArray[3] = 0x00;
      aDataArray[4] = px >> 8 & 0xff;
      aDataArray[5] = px & 0xff;
      aDataArray[6] = py >> 8 & 0xff;
      aDataArray[7] = py & 0xff;
      aDataArray[8] = xdir ;
      aDataArray[9] = ydir ;
      socket.send(aDataArray.buffer);
  }
}

function onMouseWheel(ev) { /*当鼠标滚轮事件发生时，执行一些操作*/
  var ev = ev || window.event;
  var down = true;
  //per = 1;
  down = ev.wheelDelta ? ev.wheelDelta < 0 : ev.detail > 0;
  if (down) {
      ZoomOut();
      //per += 0.05;
      //console.log("onMouseWheel down");
  } else {
      ZoomIn();
      //per -= 0.05;
      //console.log("onMouseWheel up");
  }
  //    if (ev.preventDefault) { /*FF 和 Chrome*/
  //        ev.preventDefault(); // 阻止默认事件
  //    }
  return false;
}

function MainCanvasMouseDown(e) {
  isMouseDown = true;
  pALastX = e.pageX - MainCanvas.offsetLeft;
  pALastY = e.pageY - MainCanvas.offsetTop;
  if (MainCamCutMode == 2) {
      pACurrentX = pALastX;
      pACurrentY = pALastY;
  }
}

function MainCanvasMouseUp(e) {
  isMouseDown = false;
}

function MainCanvasMouseOut(e) {
  isMouseDown = false;
}

function MainCanvasMouseMove(e) {
  if (isMouseDown) {

      if (MainCamCutMode == 2) {
          pACurrentX = e.pageX - MainCanvas.offsetLeft;
          pACurrentY = e.pageY - MainCanvas.offsetTop;

          var rectx,recty,rectw,recth ;
          if (pALastX > pACurrentX)
              rectx = pACurrentX;
          else
              rectx = pALastX;
          if (pALastY > pACurrentY)
              recty = pACurrentY;
          else
              recty = pALastY;
          rectw = Math.abs(pACurrentX - pALastX);
          recth = Math.abs(pACurrentY - pALastY);

          SetCutRect(rectx, recty, rectw, recth);  //手动裁剪区域
          //console.log(rectx + "," + recty + "," + rectw + "," + recth);
      }
      else {
          pACurrentX = e.pageX - MainCanvas.offsetLeft;
          pACurrentY = e.pageY - MainCanvas.offsetTop;
          var dx = pACurrentX - pALastX;
          var dy = pACurrentY - pALastY;
          var xdir = 0;
          var ydir = 0;
          if (dx < 0)
              xdir = 0;
          else
              xdir = 1;
          if (dy < 0)
              ydir = 0;
          else
              ydir = 1;
          pALastX = pACurrentX;
          pALastY = pACurrentY;
          MoveOffsetXY(Math.abs(dx), Math.abs(dy), xdir, ydir);
       }
   }
}

/************************************************************************************************************************************************/

//掉线重连
let wait = -1;
function reconnect(url,fun){

    clearTimeout(wait);
    wait = setTimeout(function () {

        if (isSocketConnect == false) {
            WebSocketConnect(url,fun);
            console.log("reconnect...")
        }

    }, 3000);
}

// var lockReconnect = false;
// var connectCount = 0;
// var heartTimerId = -1;
//
// //心跳检测
// function heartCheck() {
//
//   clearInterval(heartTimerId);
//   heartTimerId = setInterval(function () {
//       if (isSocketConnect) {
//           var aDataArray = new Uint8Array(3);
//           aDataArray[0] = 0x11;
//           aDataArray[1] = 0x11;
//           aDataArray[2] = 0x11;
//           socket.send(aDataArray.buffer);
//           console.log("heartCheck...........");
//       }
//   }, 6000);
// }

//心跳检测
// var heartCheck = {
//  timeout: 3000,
//  timeoutObj: null,
//  serverTimeoutObj: null,
//  start: function(){
//    console.log('start');
//    var self = this;
//    this.timeoutObj && clearTimeout(this.timeoutObj);
//    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
//    this.timeoutObj = setTimeout(function(){
//      //这里发送一个心跳，后端收到后，返回一个心跳消息，
//      console.log('55555');
//      ws.send("123456789");
//      self.serverTimeoutObj = setTimeout(function() {
//        console.log(111);
//        console.log(ws);
//        ws.close();
//        // createWebSocket();
//      }, self.timeout);
//
//    }, this.timeout)
//  }
// }


function WebSocketConnect(url,fun) {

  socket = new WebSocket(url);
  socket.binaryType = "arraybuffer";
  try {

      socket.onopen = function (event) {
          //heartCheck();
          isSocketConnect = true;
          Cam_GetDevCount();
          console.log("socket.onopen");

      };

      socket.onclose = function (event) {

          console.log("socket.onclose");
          isSocketConnect = false;
          //reconnect(url,fun);
          //CloseConnect()

      };

      socket.onerror = function (event) {
          console.log("socket.onerror");
          isSocketConnect = false;
          //reconnect(url,fun);

      };


      socket.onmessage = function (event) {

          //heartCheck.reset().start();
          //console.log("socket.onmessage");

          var rDataArr = new Uint8Array(event.data);
          if (rDataArr.length > 0) {


              if (rDataArr[0] == 0x11 && rDataArr[1] == 0x11 && rDataArr[2] == 0x11) {
                  console.log("heart socket!");
              }

              if (rDataArr[0] == 0x55 && rDataArr[1] == 0x66) {

                  //摄像头数目返回
                  if (rDataArr[2] == 0x50) {

                      var devCount = rDataArr[3];
                      var devNameBufLen = rDataArr.length - 4;
                      var devNameData = new Uint8Array(devNameBufLen);
                      for (var i = 0; i < devNameBufLen; i++) {
                          devNameData[i] = rDataArr[4 + i];
                      }
                      //var AllCamName = Uint8ArrayToString(devNameData);
                      var str = byteToString(devNameData);
                      var AllCamName = decodeURIComponent(str);
                      var camName = new Array();
                      camName = AllCamName.split('|');
                      if (devCount > 0) {
                          Cam_GetDevResolution("0");
                      } else {
                          alert("没有发现合适的设备！");
                       }
                  }

                  //摄像头分辨率返回
                  if (rDataArr[2] == 0x51) {

                      var resCount = rDataArr[3];
                      var resArr = new Array();
                      for (var i = 0; i < resCount; i++) {
                          var width = rDataArr[4 + i * 4 + 0] * 256 + rDataArr[4 + i * 4 + 1];
                          var height = rDataArr[4 + i * 4 + 2] * 256 + rDataArr[4 + i * 4 + 3];
                          var resStr = "" + width + "*" + height;
                          resArr.push(resStr);
                      }
                      if (resCount > 0) {
                          Cam_Open("0", "2592", "1944");
                      } else {
                          alert("获取分辨率信息失败！");
                       }
                  }

                  //摄像头开启状态返回
                  if (rDataArr[2] == 0x01) {

                      if (rDataArr[3] == 0x01) {//开启成功
                          //Cam_SetCutMode(1);
                          Cam_SetCutMode(3);
                           //设置裁剪区域
                           //toSleep(100);
                           //console.log("SetCustomArea");
                           SetCustomArea(5400,3800,6300,5500);
                           //Cam_TrueSize()

                           //获取曝光值
                           //GetExposureValue()
                           //设置曝光值
                           //SetManualExposure(-7)
                           console.log("ox01-------------")
                           isOpenMainCamera = true;
                      }
                      if (rDataArr[3] == 0x03) {
                          alert("打开摄像头失败！")
                      }
                  }


                  //拍照结果返回
                  if (rDataArr[2] == 0x10) {
                      //console.log(rDataArr[3]);
                      var flag;
                      if (rDataArr[3] == 0x01) {
                          flag = 0;
                      }
                      if (rDataArr[3] == 0x02) {
                          flag = 2;
                      }
                      var imgpathLen = rDataArr[4] * 256 + rDataArr[5];
                      if (imgpathLen == 0) {
                          var base64Len = rDataArr[6] * 65536 + rDataArr[7] * 256 + rDataArr[8];
                          var imgPathStr = "";
                          var base64Data = new Uint8Array(base64Len);
                          for (var i = 0; i < base64Len; i++) {
                              base64Data[i] = rDataArr[9 + imgpathLen + i];
                          }
                          var base64Str = Uint8ArrayToString(base64Data);
                          fun(flag, imgPathStr, base64Str);
                      }
                      else {
                          var base64Len = rDataArr[6] * 65536 + rDataArr[7] * 256 + rDataArr[8];
                          var pData = new Uint8Array(imgpathLen);
                          for (var i = 0; i < imgpathLen; i++) {
                              pData[i] = rDataArr[9 + i];
                          }
                          var str = byteToString(pData);
                          var imgPathStr = decodeURIComponent(str);

                          var base64Data = new Uint8Array(base64Len);
                          for (var i = 0; i < base64Len; i++) {
                              base64Data[i] = rDataArr[9 + imgpathLen + i];
                          }
                          var base64Str = Uint8ArrayToString(base64Data);

                          fun(flag, imgPathStr, base64Str);
                      }

                  }



                  //获取驱动盘符
                  if (rDataArr[2] == 0xA6) {
                      var strLen = rDataArr.length - 3;
                      if (strLen > 0) {
                          var driveData = new Uint8Array(strLen);
                          for (var i = 0; i < strLen; i++) {
                              driveData[i] = rDataArr[3 + i];
                          }
                          var driveStr = Uint8ArrayToString(driveData);
                          //GetDriveResultCB(driveStr);
                      }
                      else {
                          //GetDriveResultCB("");
                      }
                  }

                  //获取曝光值
                  if (rDataArr[2] == 0xCA) {
                      var min, max, def, cur, isAuto;
                      min = rDataArr[3];
                      max = rDataArr[4];
                      def = rDataArr[5];
                      cur = rDataArr[6];
                      isAuto = rDataArr[7];

                      if (min > 127)
                          min = min - 256;
                      if (max > 127)
                          max = max - 256;
                      if (def > 127)
                          def = def - 256;
                      if (cur > 127)
                          cur = cur - 256;

                      //GetExposureValueCB(min, max, def, cur, isAuto);

                  }

                  //摄像头数据
                  if (rDataArr[2] == 0xcc) {

                      var ww = rDataArr[3] * 256 + rDataArr[4];
                      var hh = rDataArr[5] * 256 + rDataArr[6];
                      pMainShowStartX = rDataArr[7] * 256 + rDataArr[8];
                      pMainShowStartY = rDataArr[9] * 256 + rDataArr[10];
                      MainContext.rect(0, 0, MainCanvas.width, MainCanvas.height);
                      var imgData = MainContext.createImageData(ww, hh);
                      var dataNum = 0;
                      dataNum = dataNum + 11;
                      for (var i = 0; i < imgData.data.length; i += 4) {
                          imgData.data[i + 0] = rDataArr[dataNum];
                          imgData.data[i + 1] = rDataArr[dataNum + 1];
                          imgData.data[i + 2] = rDataArr[dataNum + 2];
                          imgData.data[i + 3] = 255;
                          dataNum = dataNum + 3;
                      }

                      MainContext.putImageData(imgData, pMainShowStartX, pMainShowStartY);

                      if (MainCamCutMode == 2) {
                          MainContext.strokeStyle = 'blue'; // 设置线条的颜色
                          MainContext.lineWidth = 2; // 设置线条的宽度
                          MainContext.beginPath(); // 绘制直线
                          MainContext.rect(pALastX, pALastY, (pACurrentX - pALastX), (pACurrentY - pALastY));
                          MainContext.closePath();
                          MainContext.stroke();
                      }
                  }

                  rDataArr = null;

              }
          }



      };
  }
  catch (ex) {
      alert("异常错误!")
  }
}

export {
  LoadCameraDocument,
  camPhoto,
  MainCanvas,
  WebSocketConnect,
  CloseConnect
}
