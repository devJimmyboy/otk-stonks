import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import { Icon } from '@iconify/react'
import Kbd from '../Kbd'
import { Fade, Modal, Portal } from '@mui/material'
import { AppSearch } from '../AppSearch'
import { useBoolean } from 'react-use'
import otkLogo from '/otk-logo.svg'
import Mousetrap from 'mousetrap'

const SearchButton = styled('button')(({ theme }) => {
  return {
    minHeight: 34,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    [theme.breakpoints.only('xs')]: {
      backgroundColor: 'transparent',
      padding: 0,
      minWidth: 34,
      justifyContent: 'center',
      '& > *:not(.MuiSvgIcon-root)': {
        display: 'none',
      },
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 200,
    },
    fontFamily: theme.typography.fontFamily,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(14),
    border: `1px solid ${theme.palette.mode === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200]}`,
    borderRadius: 10,
    cursor: 'pointer',
    transitionProperty: 'all',
    transitionDuration: '150ms',
    '&:hover': {
      background: theme.palette.mode === 'dark' ? alpha(theme.palette.grey[700], 0.4) : alpha(theme.palette.grey[100], 0.7),
      borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : theme.palette.grey[300],
    },
  }
})

const SearchIconWrapper = styled('div')(({ theme }) => ({
  left: 4,
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}))

export default function SearchAppBar() {
  const [isOpen, setIsOpen] = useBoolean(false)
  const searchRef = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    Mousetrap.bind('ctrl+k', (e, combo) => {
      e.preventDefault()
      setIsOpen(true)
    })
    return () => {
      Mousetrap.unbind('ctrl+k')
    }
  }, [])
  React.useEffect(() => {
    if (isOpen && searchRef.current) searchRef.current.focus()
  }, [isOpen, searchRef.current])
  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
          <Icon icon="mdi:menu" />
        </IconButton> */}
        <div className="flex flex-row items-center justify-center gap-2">
          <img className="h-8" src={otkLogo} />
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, textShadow: '2px 2px 4px rgba(0,0,0,0.4)' }}>
            Stonks
          </Typography>
        </div>
        <div className="flex-grow " />
        <SearchButton className="group" onClick={setIsOpen}>
          <SearchIconWrapper>
            <Icon icon="mdi:magnify" height="75%" />
          </SearchIconWrapper>
          <span className="ml-5">Search...</span>
          <Kbd className="absolute right-2">Ctrl+K</Kbd>
        </SearchButton>
      </Toolbar>
      <Modal component="div" open={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 4,
            boxShadow: 24,
            p: 4,
            border: '2px solid #000',
          }}>
          <AppSearch ref={searchRef} />
        </Box>
      </Modal>
    </AppBar>
  )
}
