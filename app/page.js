'use client'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent, AppBar, Toolbar, Select, MenuItem, InputLabel, FormControl } from '@mui/material'
import { useRouter } from 'next/navigation'
import languages from '../data/languages.json'
import Head from "next/head";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, SetFlipped] = useState([])
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [Open, SetOpen] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    if (!text.trim() || !language || !difficulty) {
      alert('Please fill in all fields to generate flashcards.')
      return
    }

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          language,
          difficulty,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    }
  }

  const handleCardClick = (id) => {
    SetFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  // Firebase storage stuff

  return (
    <>
      <Head>
        <title>Flashcard App</title>
        <meta name="description" content="Flashcard App" />
      </Head>
      <Container maxWidth="md">
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' style={{ flexGrow: 1 }}>LingoFlash</Typography>
            <SignedOut>
              <Button href='/sign-in' sx={{ color: 'white', backgroundColor: 'black' }}>Login</Button>
              <Button href='/sign-up' sx={{ color: 'white', backgroundColor: 'black' }}>Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Generate Flashcards
          </Typography>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="language-label">Select Language</InputLabel>
            <Select
              labelId="language-label"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              label="Select Language"
            >
              {Object.entries(languages).map(([name, code]) => (
                <MenuItem key={code} value={code}>{name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="difficulty-label">Select Difficulty</InputLabel>
            <Select
              labelId="difficulty-label"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              label="Select Difficulty"
            >
              <MenuItem value={'A1'}>A1 - Beginner</MenuItem>
              <MenuItem value={'A2'}>A2 - Elementary</MenuItem>
              <MenuItem value={'B1'}>B1 - Intermediate</MenuItem>
              <MenuItem value={'B2'}>B2 - Upper Intermediate</MenuItem>
              <MenuItem value={'C1'}>C1 - Advanced</MenuItem>
              <MenuItem value={'C2'}>C2 - Proficient</MenuItem>
            </Select>
          </FormControl>

          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            label="Enter any additional info about your level or desired cards"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
          >
            Generate Flashcards
          </Button>
        </Box>

        {flashcards.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Generated Flashcards
            </Typography>
            <Grid container spacing={2}>
              {flashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Front:</Typography>
                      <Typography>{flashcard.front}</Typography>
                      <Typography variant="h6" sx={{ mt: 2 }}>Back:</Typography>
                      <Typography>{flashcard.back}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>
    </>
  )
}