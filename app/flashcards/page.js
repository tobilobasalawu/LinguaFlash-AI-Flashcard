'use client'

import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { Card, CardActionArea, CardContent, Typography, Grid, Container, AppBar, Toolbar, Button, TextField } from '@mui/material';
import { UserButton } from '@clerk/nextjs';
import { db } from '@/firebase';
import { useRouter } from 'next/navigation'
import Head from 'next/head'

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { userId } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [searchTerm, setSearchTerm] = useState('') // Initialize as an empty string
  const router = useRouter()

  useEffect(() => {
    async function fetchFlashcards() {
      if (!userId) return

      const docRef = doc(collection(db, 'users'), userId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const collections = docSnap.data().flashcards || []
        setFlashcards(collections)
      } else {
        await setDoc(docRef, { flashcards: [] })
        setFlashcards([])
      }
    }
    fetchFlashcards()
  }, [userId])

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  const handleCardClick = (name) => {
    if (flashcards.length > 0) {
      router.push(`/flashcards/${name}`)
    }
  }

  const handleGenerateFlashcards = () => {
    // Implement this function
  }

  const handleSignOut = () => {
    // Implement this function
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredFlashcards = flashcards.filter(flashcard =>
    flashcard.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            {!isLoaded ? null : isSignedIn ? (
              <>
                <Button onClick={handleGenerateFlashcards} sx={{ color: 'white', mr: 1 }}>+ New</Button>
                <UserButton />
                <Button onClick={handleSignOut} sx={{ color: 'white', ml: 1 }}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button href='/sign-in' sx={{ color: 'white', backgroundColor: 'black', mr: 1 }}>Login</Button>
                <Button href='/sign-up' sx={{ color: 'white', backgroundColor: 'black' }}>Sign Up</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Container maxWidth="100vw">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search flashcards..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mt: 2, mb: 2 }}
          />
          {filteredFlashcards.length === 0 ? (
            <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
              {flashcards.length === 0 ? "You don't have any flashcards yet. Create some to get started!" : "No matching flashcards found."}
            </Typography>
          ) : (
            <Grid container spacing={2} sx={{ mt: 4 }}>
              {filteredFlashcards.map((flashcard, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={index}>
                  <Card>
                    <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                      <CardContent>
                        <Typography variant="h5">{flashcard.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Container>
    </>
  )
}