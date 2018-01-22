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
    reply_id
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