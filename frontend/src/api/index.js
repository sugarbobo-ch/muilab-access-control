import request from '@/utils/request'
import config from './config'

export function getCurrentCount() {
  return request({
    url: config.baseURL + `/log`,
    method: 'get'
  })
}

export function setCurrentCount(data) {
  return request({
    url: config.baseURL + `/log`,
    method: 'post',
    data
  })
}

export function addLog(data) {
  return request({
    url: config.baseURL + `/log`,
    method: 'put',
    data
  })
}
