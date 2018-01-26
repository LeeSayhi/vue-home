import axios from 'axios'

export function login(accesstoken) {
  const url = `https://www.vue-js.com/api/v1/accesstoken`

  return axios.post(url, {
    accesstoken
  })
}

export function getReplies(topic_id, accesstoken, content, reply_id) {
  const url = `https://www.vue-js.com/api/v1/topic/${topic_id}/replies`

  return axios.post(url, {
    accesstoken,
    content,
    reply_id: reply_id || ''
  })
}

export function getTopicInfo(id) {
  const url = `https://www.vue-js.com/api/v1/topic/${id}`

  return axios.get(url, {
    params: {
      mdrender: true
    }
  })
}

export function ups(reply_id, accesstoken) {
  const url = `https://www.vue-js.com/api/v1/reply/${reply_id}/ups`

  return axios.post(url, {
    accesstoken
  })
}

// 未读消息数
export function getNoReadCount(accesstoken) {
  const url = 'https://www.vue-js.com/api/v1/message/count'

  return axios.get(url, {
    params: {
      accesstoken
    }
  })
}

//以读消息和未读消息
export function getMessages(accesstoken)  {
  const url = 'https://www.vue-js.com/api/v1/messages'

  return axios.get(url, {
    params: {
      accesstoken
    }
  })
}