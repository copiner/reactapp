import { message } from 'antd'

export default {
  error(e) {
    if (e.message) {
      message.error(e.message,5)
    } else {
      console.error(e)
    }
  }
}
