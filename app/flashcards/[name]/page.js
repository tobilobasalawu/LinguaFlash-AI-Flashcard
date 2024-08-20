"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { collection, getDocs } from "firebase/firestore"
import { db } from "@/firebase"
import { useParams } from "next/navigation"
import Header from "@/components/Header"
import { Grid, Card, CardActionArea, CardContent, Box } from "@mui/material"

export default function FlashcardSet() {
  const { name } = useParams()
  const { userId } = useAuth()
  const [flashcardSet, setFlashcardSet] = useState(null)
  const [flipped, setFlipped] = useState([])

  useEffect(() => {
    async function fetchFlashcardSet() {
      if (!userId || !name) return

      const flashcardsCollectionRef = collection(db, "users", userId, name)
      try {
        const querySnapshot = await getDocs(flashcardsCollectionRef)
        const flashcards = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
    setFlipped((prev) => {
      const newFlipped = [...prev]
      newFlipped[index] = !newFlipped[index]
      return newFlipped
    })
  }

  if (!flashcardSet) {
    return <div>Loading...</div>
  }

  if (flashcardSet.length === 0) {
    return <div>No flashcards found for {name}</div>
  }

  return (
    <div className="flex flex-col gap-10 min-h-svh px-5 md:px-10 py-20  pt-[153px] lg:pt-[169px] pb-20">
      <Header />
      <h1 className="capitalize font-dela-gothic-one text-4xl lg:text-5xl !leading-none tracking-normal pb-2 text-white">
        {name}
      </h1>
      <Grid
        container
        spacing={2}
      >
        {flashcardSet.map((flashcard, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
          >
            <Card
              sx={{
                background:
                  "url(/images/noise/noise.svg), linear-gradient(-125deg, #8864F4 14%, #D668AA 100%), linear-gradient(#A385FF, #D0C1FC)",
                borderRadius: {
                  xs: "16px",
                  md: "24px",
                },
                padding: { xs: "20px", md: "40px" },
              }}
            >
              <CardActionArea onClick={() => handleCardClick(index)}>
                <CardContent>
                  <Box
                    sx={{
                      perspective: "1000px",
                      height: "160px",
                    }}
                  >
                    <Box
                      sx={{
                        transition: "transform 0.8s",
                        transformStyle: "preserve-3d",
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        transform: flipped[index]
                          ? "rotateY(180deg)"
                          : "rotateY(0deg)",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 2,
                          boxSizing: "border-box",
                        }}
                      >
                        <h3 className="font-dela-gothic-one text-xl lg:text-2xl !leading-none tracking-normal pb-2 text-black text-center">
                          {flashcard.front}
                        </h3>
                      </Box>
                      <Box
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          backfaceVisibility: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: 2,
                          boxSizing: "border-box",
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <h3 className="font-dela-gothic-one text-xl lg:text-2xl !leading-none tracking-normal pb-2 text-black text-center">
                          {flashcard.back}
                        </h3>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
