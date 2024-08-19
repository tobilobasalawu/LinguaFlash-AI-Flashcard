'use client'

import { useState, useEffect } from 'react'
import { useAuth, useUser, UserButton, useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import { useParams } from 'next/navigation'
import Head from 'next/head'
import { Grid, Card, CardActionArea, CardContent, Box, Typography, Container, AppBar, Toolbar, Button } from '@mui/material'

export default function FlashcardSet() {
  const { name } = useParams()
  const { userId } = useAuth()
  const [flashcardSet, setFlashcardSet] = useState(null)
  const [flipped, setFlipped] = useState([])
  const { isLoaded, isSignedIn } = useUser()
  const { signOut } = useClerk()
  const router = useRouter()

  useEffect(() => {
    async function fetchFlashcardSet() {
      if (!userId || !name) return

      const flashcardsCollectionRef = collection(db, 'users', userId, name)
      try {
        const querySnapshot = await getDocs(flashcardsCollectionRef)
        const flashcards = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        console.log("Fetched flashcards:", flashcards)
        setFlashcardSet(flashcards)
        setFlipped(new Array(flashcards.length).fill(false))
      } catch (error) {
        console.error("Error fetching flashcards:", error)
        setFlashcardSet([])
      }
    }
    fetchFlashcardSet()
  }, [userId, name])

  const handleCardClick = (index) => {
    setFlipped(prev => {
      const newFlipped = [...prev]
      newFlipped[index] = !newFlipped[index]
      return newFlipped
    })
  }

  const handleSignOut = () => {
    signOut()
  }

  const handleGenerateFlashcards = () => {
    router.push('/')
  }

  if (!flashcardSet) {
    return <div>Loading...</div>
  }

  if (flashcardSet.length === 0) {
    return <div>No flashcards found for {name}</div>
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
        <h1>{name}</h1>
        <Grid container spacing={2}>
          {flashcardSet.map((flashcard, index) => (
            <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
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
      </Container>
    </>
  )
}