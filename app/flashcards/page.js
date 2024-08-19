'use client'

import { useState, useEffect} from 'react'
import { useAuth, useUser} from '@clerk/nextjs'
import { doc, collection, getDoc, setDoc } from 'firebase/firestore';
import {Card, CardActionArea, CardContent, Typography, Grid, Container} from '@mui/material';
import { db } from '@/firebase'; // Adjust this import path as needed
import { useRouter } from 'next/navigation'

export default function Flashcard() {
  const {isLoaded, isSignedIn, user} = useUser()
  const {userId} = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([])
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
        await setDoc(docRef, {flashcards: []})
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

  return (
    <Container maxWidth="100vw" onClick={() => {}}>
      {flashcards.length === 0 ? (
        <Typography variant="h5" sx={{ mt: 4, textAlign: 'center' }}>
          You don't have any flashcards yet. Create some to get started!
        </Typography>
      ) : (
        <Grid container spacing={2} sx={{mt: 4}}>
          {flashcards.map((flashcard, index) => (
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
  )
}