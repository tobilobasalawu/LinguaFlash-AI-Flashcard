'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'
import { Container, TextField, Button, Typography, Box, Grid, Card, CardContent, AppBar, Toolbar, Select, MenuItem, InputLabel, FormControl, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, CardActionArea } from '@mui/material'
import { doc, collection, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';


import {useSearchParams} from 'next/navigation'

export default function Flashcard() {
  const {isLoaded, isSignedIn, user} = useUser()
  const { userId } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, setFlipped] = useState([])

  const searchParams = useSearchParams()
  const search = searchParams.get('search')

  useEffect(() => {
    async function fetchFlashcard() {
      if (!search || !userId) return

      const docRef = doc(collection(db, 'users'), userId)
      const docs = await getDocs(docRef)
      const flashcards = []

      docs.forEach((doc) => {
        flashcards.push({id: doc.id, ...doc.data()})
      })
      setFlashcards(flashcards)
    }
    fetchFlashcard()
  }, [userId, search])

  const handleCardClick = (index) => {
    SetFlipped((prev) => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  if (!isLoaded || !isSignedIn) {
    return <></>
  }

  return (
    <Container maxWidth="100vw">
      <Grid container spacing={3} sx={{mt: 4}}>
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
      </Grid>
    </Container>
  )
}