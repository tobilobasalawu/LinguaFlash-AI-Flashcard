'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from '@mui/material'
import { useUser } from '@clerk/nextjs'

export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState(false)
  const [isLoaded, isSignedIn, useRouter] = useUser()
  const [name, setName] = useState('')
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    // We'll implement the API call here
    fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }).then((res) => res.json())
    .then((data) => {
      setFlashcards(data)
    })
  }

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

}