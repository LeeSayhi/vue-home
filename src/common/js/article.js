class Art{
  constructor ({id, title, time}) {
    this.id = id,
    this.title = title,
    this.time = time
  }
}

export function createArt(data) {
  return new Art({
    id: data.id,
    title: data.title,
    time: data.create_at
  })
}
