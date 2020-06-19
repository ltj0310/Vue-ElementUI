import { Message } from 'element-ui'
import { getCookie } from '@/utils/cookie'


const ws = "ws://"
const sever = '' // websocket连接地址

let timer = null

/**
 * websocket 封装
 */
export default class Socket {
  constructor(url) {
    this.url = ws + sever + url
    this.first = true // 首次连接
    this.promiseObj = {} // 已发送的socket信息
  }
  open = () => {
    return new Promise((resolve, reject) => {
      if (typeof this._websocket === 'undefined') {
        this._websocket = new WebSocket(this.url)

        this._websocket.onopen = () => {
          console.log(`websocket连接成功`)
        }

        this._websocket.onerror = (e) => {
          console.log(`websocket连接失败`)
          this._websocket.close()
          reject(e)
        }
      }
      this._websocket.onmessage = (e) => {
        const msg = JSON.parse(e.data)
        if (this.first) {
          // 首次连接返回的一般都是无用信息
          // 所以只需要直接resolve即可
          this.first = false
          resolve(msg)
        } else {
          // 接收数据
          // 判断接收回来的msgId是否存在promiseObj中
          // 存在则resolve,反之reject
          // 最后删除promiseObj对应的msgId所携带的信息
          const { message, status, msgId } = msg
          const req = this.promiseObj[msgId]
  
          if (req) {
            if (status === 200) {
              req.resolve(msg)
            } else {
              Message({ message, type: 'error' })
              Promise.reject(new Error(message))
              req.reject(message)
            }
  
            delete this.promiseObj[msgId]
          }
  
          if (timer) clearInterval(timer)
        }
      }
    })
  }
  close = () => {
    this._websocket.close()
  }
  send = ({ msgId, ...data }, timeout = 25) => {
    return new Promise((resolve, reject) => {
      // 把需要发送的信息都放进promiseObj中
      this.promiseObj[msgId] = { data, resolve, reject }
      this._websocket.send(JSON.stringify({ ...data, msgId, token: getCookie('token')}))

      // 判断是否存在响应超时机制
      if (timeout) {
        timer = setInterval(() => {
          console.log(`websocket连接超时`)
          reject()
        }, timeout * 1000)
      }
    })
  }
}