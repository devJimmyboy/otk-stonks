import { Icon } from '@iconify/react'
import { Drawer, Toolbar, Box, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, ListItemButton, AvatarGroup, Avatar, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoolean } from 'react-use'
import { getEmote } from '../../src/lib/utils'
import { useStore } from '../../src/store'
import SideBarItem from './SideBarItem'

type Props = {}
const drawerWidthOpen = 240
const drawerWidthClosed = 72
const listItems = [
  { text: 'Main Page', icon: <img className="h-8" {...getEmote('corpa')} />, link: '/' },
  // { text: 'About', link: '/about' },
]

export default function SideBar({}: Props) {
  const [open, setOpen] = useBoolean(false)
  const [drawerWidth, setDrawerWidth] = React.useState<number>(drawerWidthClosed)
  const navigate = useNavigate()
  useEffect(() => {
    if (open) {
      setDrawerWidth(drawerWidthOpen)
    } else {
      setDrawerWidth(drawerWidthClosed)
    }
  }, [open])
  const streamerListItems = useStore((state) => state.streamers)

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,

        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { overflow: 'hidden', width: drawerWidth, boxSizing: 'border-box' },
      }}>
      <Toolbar />
      <Box sx={{ overflow: 'hidden' }}>
        <List>
          {listItems.map((item, index) => (
            <SideBarItem index={index} item={item} open={open} />
          ))}
        </List>
        <Divider />
        <List>
          {streamerListItems.map(({ displayName: login, avatar }, index) => (
            <ListItemButton onClick={() => login && navigate(`/${login.toLowerCase()}`)} key={login}>
              {open ? (
                <>
                  <ListItemIcon>
                    <Avatar src={avatar} imgProps={{ crossOrigin: 'anonymous' }} />
                  </ListItemIcon>
                  <ListItemText primary={login} />
                </>
              ) : (
                <Avatar src={avatar} imgProps={{ crossOrigin: 'anonymous' }} />
              )}
            </ListItemButton>
          ))}
        </List>
      </Box>
      <div className="flex-grow" />

      <IconButton sx={{ borderRadius: 0, height: '48px' }} onClick={setOpen}>
        <Icon height="32px" icon={open ? 'fa-solid:arrow-left' : 'fa-solid:arrow-right'}></Icon>
      </IconButton>
    </Drawer>
  )
}
