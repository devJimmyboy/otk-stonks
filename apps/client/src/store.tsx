import create, { SetState } from 'zustand'
import { Streamer } from '../types'
import { combine, NamedSet } from 'zustand/middleware'

interface AppState {
  streamers: Streamer[]
}
const state: AppState = { streamers: [] }

const actions = (set: SetState<typeof state> & NamedSet<typeof state>) => ({
  fetchStreamers: async () => {
    const response = await fetch('/streamers')
    set({ streamers: await response.json() })
  },
})
export const useStore = create(combine(state, actions))
