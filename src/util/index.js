import Session from "./session"
import CNF from '../config'

export function validCertNo(cert){
  const pattern = /^[1-9]\d{5}(18|19|2([0-9]))\d{2}(0[0-9]|10|11|12)([0-2][1-9]|10|20|30|31)\d{3}[0-9Xx]$|^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$/

  return pattern.test(cert)
}

export function idAge(card) {
    //获取年龄
    var myDate = new Date();
    var month = myDate.getMonth() + 1;
    var day = myDate.getDate();
    var age = 0;

    if(!validCertNo(card)){
      return;
    }

    if(card.length == 15){
      var age = myDate.getFullYear() -("19"+ card.substring(6, 8)) - 1;
      if (card.substring(8, 10) < month || card.substring(8, 10) == month && card.substring(10, 12) <= day) {
          age++;
      }
    }

    if(card.length == 18){
      var age = myDate.getFullYear() - card.substring(6, 10) - 1;
      if (card.substring(10, 12) < month || card.substring(10, 12) == month && card.substring(12, 14) <= day) {
          age++;
      }
    }


    return age;
}

export function ageDays(card) {

  let TotalDays = function(year,month,days){
      switch (month) {
          case 1:
          case 3:
          case 5:
          case 7:
          case 8:
          case 10:
          case 12:
              days += 31;
              break;
          case 4:
          case 6:
          case 9:
          case 11:
              days += 30;
              break;
          case 2:
              if (isLeapYear(year)) {
                  days += 29;
              } else {
                  days += 28;
              }
              break;
          default:
              if (isLeapYear(year)) {
                  days = 366;
              } else {
                  days = 365;
              }
              break;
      }
      return days;
  }


  let isLeapYear = function(Year) {
      if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
          return (true);
      } else {
        return (false);
      }
  }


  var daysTotal = 0;
  var date = new Date();
  var year = date.getFullYear();//当前年份
  var _month = date.getMonth() + 1;//当前月份
  var _day =date.getDate();//当前天数
  // var month = parseInt(birthday.split('-')[1]);//生日月份
  // var day = parseInt(birthday.split('-')[2]);//生日天数

  if(card.length == 15){
    var month = parseInt(card.substring(8, 10));
    var day = parseInt(card.substring(10, 12));
  }

  if(card.length == 18){
    var month = parseInt(card.substring(10, 12));
    var day = parseInt(card.substring(12, 14));
  }

  if(!(month && day)){
    return;
  }

  if (month > _month){
      for (var j = _month; j < month; j++){
          daysTotal = TotalDays(year, j, daysTotal);
      }
      daysTotal = daysTotal + day - _day;
  } else if (month < _month) {
      for (var k = month; k < _month; k++) {
          daysTotal = TotalDays(year,k, daysTotal);
      }
      var dayFull = TotalDays(year, 0, daysTotal);
      daysTotal = dayFull - daysTotal + day - _day;
  } else {
      if (day >= _day) {
          daysTotal = day - _day;
      } else {
          daysTotal = TotalDays(year, 0, daysTotal) - (_day - day);
      }
  }

  return daysTotal;
}

export const uuid = () => {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 32; i++) {
  s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23];
  var uuid = s.join("");
  return uuid;
};

export const loopMenu = (list,arr) =>{//TODO

  let data = JSON.parse(JSON.stringify(list));

  let looped = (data) => {
   data.forEach(function (item,index) {

     if(arr && arr.includes(item.id)){
       item.status = true;
     }
     if(item.routes){
       looped(item.routes);
     }

   })
  }

  looped(data)

  return data;

}

export function after70y(idNo){

    let after70b = 0;

    if(!validCertNo(idNo)){
      return;
    }

    if(idNo.length == 18){
      after70b = Number(idNo.substring(6, 10)) + 70 + idNo.substring(10, 14);
    }
    if(idNo.length == 15){
      after70b = Number("19" + idNo.substring(6, 8)) + 70 + idNo.substring(8, 12);
    }
    //console.log(after70b)
    return Number(after70b);

}

export function debounce(fn, delay){
  var timer;
  return function () {
    var context = this
    var args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

export function MD5(sMessage){
    function RotateLeft(lValue, iShiftBits)
    {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits)); }
    function AddUnsigned(lX,lY)
    {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function F(x,y,z)
    {
        return (x & y) | ((~x) & z); }
    function G(x,y,z)
    {
        return (x & z) | (y & (~z)); }
    function H(x,y,z)
    {
        return (x ^ y ^ z); }
    function I(x,y,z)
    {
        return (y ^ (x | (~z))); }
    function FF(a,b,c,d,x,s,ac)
    {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function GG(a,b,c,d,x,s,ac)
    {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function HH(a,b,c,d,x,s,ac)
    {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function II(a,b,c,d,x,s,ac)
    {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function ConvertToWordArray(sMessage)
    {
        var lWordCount;
        var lMessageLength = sMessage.length;
        var lNumberOfWords_temp1=lMessageLength + 8;
        var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
        var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
        var lWordArray=Array(lNumberOfWords-1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while ( lByteCount < lMessageLength ) {
            lWordCount = (lByteCount-(lByteCount % 4))/4;
            lBytePosition = (lByteCount % 4)*8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount)<<lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
    }
    function WordToHex(lValue)
    {
        var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
        for (lCount = 0; lCount<=3; lCount++) {
            lByte = (lValue>>>(lCount*8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
        }
        return WordToHexValue;
    }
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
    // Steps 1 and 2. Append padding bits and length and convert to words
    x = ConvertToWordArray(sMessage);
    // Step 3. Initialise
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    // Step 4. Process the message in 16-word blocks
    for (k=0; k<x.length; k+=16) {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA); b=AddUnsigned(b,BB); c=AddUnsigned(c,CC); d=AddUnsigned(d,DD);
    }
    // Step 5. Output the 128 bit digest
    var temp= WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
    return temp.toLowerCase();
}

export function printMe(obj){
  let auth = Session.getItem("info");

  let title="",busi="",name="",idtype="",idno="",facenum="",times="",fee="",validdate="",oper="",foot="";

  title="     杭州市凭证"+"\n\n\n"
  busi = "业务类型："+ obj.busiType +"\n";
  name = "姓    名："+obj.custName+"\n";
  idtype = "证件类型："+obj.idTypeName+"\n";
  idno = "证件号码："+obj.custIdNo+"\n";
  times = "操作时间："+ obj.times + "\n";

  fee = "费    用："+ (obj.fee||"0") + "元\n";

  if(obj.validDate){
    validdate = "有效日期："+ obj.validDate + " 止\n"
  }

  if(obj.facenum){
    facenum = "银行卡面编号："+ obj.facenum + "\n";
  }

  oper = "操作员编号："+auth.account+"\n\n\n";
  foot = "请仔细核对，妥善保管"+"\n";

  let params={
    location:"25,0",
    wordinfo:title+busi+name+idtype+idno+facenum+times+fee+validdate+oper+foot
  }
  return params;
}

export function downFileAtFront (base64Str, filename, type){

   //根据文件类型后缀，获取Base64字符串前缀
  let base64Prefix =  function(type) {
      switch (type) {
          case 'txt': return 'data:text/plain;base64,';
          case 'doc': return 'data:application/msword;base64,';
          case 'docx': return 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,';
          case 'xls': return 'data:application/vnd.ms-excel;base64,';
          case 'xlsx': return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
          case 'pdf': return 'data:application/pdf;base64,';
          case 'pptx': return 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,';
          case 'ppt': return 'data:application/vnd.ms-powerpoint;base64,';
          case 'png': return 'data:image/png;base64,';
          case 'jpg': return 'data:image/jpeg;base64,';
          case 'gif': return 'data:image/gif;base64,';
          case 'svg': return 'data:image/svg+xml;base64,';
          case 'ico': return 'data:image/x-icon;base64,';
          case 'bmp': return 'data:image/bmp;base64,';
      }
  }

  //带有类型前缀的Base64字符串  转为  blob
  let dataURLtoBlob = function(dataurl) {
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
  }


  let dataurl = base64Prefix(type) + base64Str;

  //下载文件
  const a = document.createElement("a");
  let myBlob = dataURLtoBlob(dataurl);

  a.href = window.URL.createObjectURL(myBlob);
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(a.href);
  a.remove();

  //后端返回流的方式
  // let url = window.URL.createObjectURL(new Blob([res.data]));
  // let link = document.createElement("a");
  // link.style.display = "none";
  // link.href = url;
  // link.setAttribute("download", '体检名单' + new Date().getTime() + ".xlsx");
  // document.body.appendChild(link);
  // link.click();

}
