import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Box, Typography } from '@mui/material'
import SearchAppBar from '../components/NavBar'
import Home from './pages/Home'
import SideBar from '../components/SideBar'
import Streamer from './pages/Streamer'
import { useStore } from './store'

function App() {
  const { fetchStreamers } = useStore((state) => ({ fetchStreamers: state.fetchStreamers }))
  useEffect(() => {
    fetchStreamers()
  }, [])
  return (
    <div className="App">
      <Helmet titleTemplate="OTK Stonks - %s">
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="https://otk.jimmyboy.dev" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Helmet>
      <SearchAppBar />
      <Box component="header" className="App-header">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":name" element={<Streamer />} />
        </Routes>
      </Box>
    </div>
  )
}

export default App
