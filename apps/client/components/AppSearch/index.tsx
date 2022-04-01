import * as React from 'react'
import { alpha, styled } from '@mui/material/styles'
import { Icon } from '@iconify/react'
import { searchClient } from '../../src/lib/search'
import { Box, Input } from '@mui/material'

const SearchLabel = styled('span')(({ theme }) => {
  return {
    marginLeft: theme.spacing(1),
    marginRight: 'auto',
  }
})

const Shortcut = styled('div')(({ theme }) => {
  return {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 700,
    lineHeight: '20px',
    marginLeft: theme.spacing(0.5),
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[500] : theme.palette.grey[200]}`,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#FFF',
    padding: theme.spacing(0, 0.8),
    borderRadius: 5,
  }
})
interface Props {}
export const AppSearch = React.forwardRef<HTMLInputElement, Props>(({}, ref) => {
  return (
    <div className="searchBox">
      <Box className="searchContainer">
        <div className="search">
          <Input className="searchInput" fullWidth placeholder="Search" inputRef={ref} />
        </div>
        <div className="hits"></div>
      </Box>
    </div>
  )
})
AppSearch.displayName = 'AppSearch'
