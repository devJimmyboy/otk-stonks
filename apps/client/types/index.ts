export interface Streamer {
  id: string
  chatters: string[]
  displayName: string
  avatar: string
  login: string
  uid: string
}
export interface Chatter {
  login: string
  id: string
  badges: string[]
  color?: string
  last: {
    [key: string]: number
  }
  present: {
    [key: string]: number
  }
  roles: {
    [key: string]: string
  }
  streams: {
    [key: string]: number[]
  }
  time: {
    [key: string]: number
  }
}
