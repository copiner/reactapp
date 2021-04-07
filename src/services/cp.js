/*
read card
print receipt
*/

import API from './api'

export default class CpServer {

  static readCsn = () => fetch(API.CP.READCSN, {
    method:'post',
    mode: 'cors',//no-cros
    body: JSON.stringify({
      reqseq: Math.random().toString(36).slice(-6)
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  static printStatus = () => fetch(API.CP.PRINTSTATUS, {
    method:'post',
    mode: 'cors',//no-cros
    body: JSON.stringify({
      reqseq: Math.random().toString(36).slice(-6)
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  static printCard = (data) => fetch(API.CP.PRINTCARD, {
    method:'post',
    mode: 'cors',//no-cros
    body: JSON.stringify({
      reqseq: Math.random().toString(36).slice(-6),
      ...data
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  static printReceipt = (data) => fetch(API.CP.PRINTRECEIPT, {
    method:'post',
    mode: 'cors',//no-cros
    body: JSON.stringify({
      reqseq: Math.random().toString(36).slice(-6),
      ...data
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  // static readCsn = (data) => fetch("http://127.0.0.1:8080/api/mispos/Handle", {
  //   method:'post',
  //   mode: 'cors',//no-cros
  //   body: JSON.stringify({"loprType":"1008","dest":"","amt":"0","src":""}),
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   }
  // })

  //static readCsn = (data) => axios.post(API.CP.READCSN, data||{})
  // static printStatus = (data) => axios.post(API.CP.PRINTSTATUS, data||{})
  //static printCard = (data) => axios.post(API.CP.PRINTCARD, data||{})
  //static printReceipt = (data) => axios.post(API.CP.PRINTRECEIPT, data||{})
}
