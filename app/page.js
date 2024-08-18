'use client'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs'
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent, AppBar, Toolbar, Select, MenuItem, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardActionArea } from '@mui/material'
import { useRouter } from 'next/navigation'
import languages from '../data/languages.json'
import Head from "next/head";

export default function Generate() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { userId } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, SetFlipped] = useState([])
  const [text, setText] = useState('')
  const [language, setLanguage] = useState('')
  const [difficulty, setDifficulty] = useState('')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    if (!userId) {
      alert('Please sign in to generate flashcards.')
      return
    }

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

  const handleCardClick = (index) => {
    SetFlipped((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const saveFlashcards = async () => {
    const batch = writeBatch(db)
    const userDocRef = doc(collection(db, 'users'), user.id)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || []
      if (collections.find((f) => f.name === name)) {
        alert('A collection with that name already exists. Please enter a different name.')
        return
      } else {
        collections.push({ name })
        batch.set(userDocRef, { flashcards: collections }, { merge: true })
      }
    } else {
      batch.set(userDocRef, { flashcards: [{ name }] })
    }

    const colRef = collection(userDocRef, name)
    flashcards.forEach((flashcard) => {
      const cardDocRef = doc(colRef)
      batch.set(cardDocRef, flashcard)
    })

    await batch.commit()
    handleClose()
    router.push('flashcards')
  }

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

          {isSignedIn ? (
            <>
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
            </>
          ) : (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Please sign in to generate and use flashcards.
              </Typography>
              <Button href="/sign-in" variant="contained" color="primary" sx={{ mr: 2 }}>
                Sign In
              </Button>
              <Button href="/sign-up" variant="outlined" color="primary">
                Sign Up
              </Button>
            </Box>
          )}
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
                    <CardActionArea onClick={() => handleCardClick(index)}>
                      <CardContent>
                        <Box sx={{
                          perspective: '1000px',
                          height: '150px',
                        }}>
                          <Box sx={{
                            transition: 'transform 0.8s',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          }}>
                            <Box sx={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 2,
                              boxSizing: 'border-box',
                            }}>
                              <Typography variant="h6" component="div">
                                {flashcard.front}
                              </Typography>
                            </Box>
                            <Box sx={{
                              position: 'absolute',
                              width: '100%',
                              height: '100%',
                              backfaceVisibility: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: 2,
                              boxSizing: 'border-box',
                              transform: 'rotateY(180deg)',
                            }}>
                              <Typography variant="h6" component="div">
                                {flashcard.back}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Button variant="contained" color="secondary" onClick={handleOpen}>
                Save Flashcards
              </Button>
            </Box>
          </Box>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Save Flashcards</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter a name for your flashcard collection.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Collection Name"
              type="text"
              fullWidth
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">Cancel</Button>
            <Button onClick={saveFlashcards} color="secondary">Save</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  )
}