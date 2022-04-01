import { Avatar, Box, Stack, TextField, Typography } from '@mui/material'
import { debounce } from 'lodash'
import React from 'react'
import { Navigate, useParams, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import StreamerChatterStats from '../../components/StreamerChatterStats'
import { useStore } from '../store'

interface Props {}
const stvPfp = ({ id, pfpId }: { id: string; pfpId: string }) => `https://cdn.7tv.app/pp/${id}/${pfpId}`
const fetcher = (url: string) => fetch(url).then((r) => r.json())
export default function Streamer({}: Props) {
  const params = useParams()
  const [query] = useSearchParams({ chatter: '' })
  const streamers = useStore((state) => state.streamers)
  const streamer = streamers.find((s) => s.login.toLowerCase() === params.name?.toLowerCase())
  const { data: stvData, isValidating } = useSWR(() => params.name && `https://api.7tv.app/v2/users/${params.name}`, fetcher)
  const [chatter, setChatter] = React.useState(query.get('chatter') || '')
  const handleChatter = debounce((e: React.ChangeEvent<HTMLInputElement>) => setChatter(e.target.value), 300)
  if (streamers.length === 0) return null

  if (!params.name || !streamer) {
    return <Navigate to="/" />
  }
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Stack sx={{ py: 12 }} direction="row" spacing={6} alignItems="center" justifyContent="center">
        {!isValidating && stvData && (
          <Avatar
            className="outline outline-4"
            src={stvData['profile_picture_id'] ? stvPfp({ id: stvData.id, pfpId: stvData['profile_picture_id'] }) : streamer.avatar}
            sx={{ width: 112, height: 112 }}
            imgProps={{ crossOrigin: 'anonymous' }}
          />
        )}
        <Typography variant="h1" fontWeight={700}>
          {streamer.displayName}
        </Typography>
      </Stack>
      <TextField sx={{ mb: 2, minWidth: 250, position: 'relative', right: 0 }} label="Search for a Specific Chatter..." defaultValue={chatter} onChange={handleChatter} />
      <StreamerChatterStats chatter={chatter} streamer={streamer} />
    </Box>
  )
}
