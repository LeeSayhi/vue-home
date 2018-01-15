class Art {
  constructor({ id, title, time, collectTime}) {
    this.id = id,
    this.title = title,
    this.time = time,
    this.collectTime = collectTime
  }
}

export function createArt(data) {
  return new Art({
    id: data.id,
    title: data.title,
    time: data.create_at,
    collectTime: getCurrentTime()
  })
}

function getCurrentTime() {
  return new Date()
}