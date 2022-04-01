import { Box, Fade, List, ListItemButton, ListItemIcon, ListItemText, Popover, Popper, Stack } from '@mui/material'
import { Icon } from '@iconify/react'
import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBoolean, useHover, useHoverDirty, useMouseHovered } from 'react-use'

interface Props {
  item: {
    text: string
    icon?: React.ReactNode | string
    link?: string
  }
  index?: number
  open: boolean
}

export default function SideBarItem({ item, open, index }: Props) {
  const { text, icon, link } = item
  const anchorEl = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useBoolean(false)
  const [timeout, setTimeoutId] = React.useState<ReturnType<typeof setTimeout> | undefined>()

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (timeout) {
      clearTimeout(timeout)
      setTimeoutId(undefined)
    }
    setIsOpen(true)
  }

  const navigate = useNavigate()
  return (
    <>
      <ListItemButton
        ref={anchorEl}
        disableGutters
        sx={{ px: 1, height: '48px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => link && navigate(link)}
        key={text}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={() => {
          setTimeoutId(setTimeout(() => setIsOpen(false), 500))
        }}>
        {open ? (
          <>
            <ListItemIcon sx={{}}>{typeof icon === 'string' ? <Icon height="24px" icon={icon || 'fa-solid:question'} /> : icon}</ListItemIcon>
            <ListItemText primary={text} />
          </>
        ) : (
          <>{typeof icon === 'string' ? <Icon height="24px" icon={icon || 'fa-solid:question'} /> : icon}</>
        )}
      </ListItemButton>
      <Popper
        id="mouse-over-popover"
        open={isOpen}
        anchorEl={() => anchorEl.current}
        placement="right"
        onMouseLeave={() => setTimeoutId(setTimeout(() => setIsOpen(false), 500))}
        onMouseEnter={handlePopoverOpen}
        transition
        // onClose={handlePopoverClose}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={(theme) => ({
                ml: 1,
                borderRadius: '0.45rem',
                height: 60,
                bgcolor: 'background.paper',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  marginRight: '-0.71em',
                  bottom: '50%',
                  left: 8,
                  width: 10,
                  height: 10,
                  backgroundColor: theme.palette.background.paper,
                  boxShadow: theme.shadows[1],
                  transform: 'translate(-50%, 50%) rotate(225deg)',
                  clipPath: 'polygon(-5px -5px, calc(100% + 5px) -5px, calc(100% + 5px) calc(100% + 5px))',
                },
              })}>
              <Stack direction="row" sx={{ height: '100%' }}>
                <ListItemButton sx={{ maxWidth: 60, height: '100%' }}>
                  <Icon height="32" icon="mdi:ab-testing" />
                </ListItemButton>
                <ListItemButton sx={{ maxWidth: 60, height: '100%' }}>
                  <Icon height="32" icon="mdi:ab-testing" />
                </ListItemButton>
              </Stack>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  )
}
