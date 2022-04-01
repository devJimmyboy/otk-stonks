import { Box, Typography } from '@mui/material'
import React from 'react'
import { getEmote } from '../lib/utils'

type Props = {}

export default function Home({}: Props) {
  return (
    <Box>
      <img {...getEmote('corpa')} />
      <Typography variant="h2" component="h2" fontWeight={800}>
        Yo.
      </Typography>
      <Typography variant="h2" component="h2" fontWeight={800}>
        Welcome to OTK Stonks
      </Typography>
      <Typography variant="body1" mt={4} fontWeight={600}>
        A place to see how degen you REALLY are.
      </Typography>
    </Box>
  )
}
