"use client"

import { useUser, useAuth } from "@clerk/nextjs"
import { useState } from "react"
import {
  TextField,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardActionArea,
  CircularProgress,
} from "@mui/material"
import { useRouter } from "next/navigation"
import languages from "../../data/languages.json"
import { doc, collection, writeBatch, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import Header from "@/components/Header"
import Link from "next/link"

export default function Generate() {
  const { isSignedIn, user } = useUser()
  const { userId } = useAuth()
  const [flashcards, setFlashcards] = useState([])
  const [flipped, SetFlipped] = useState([])
  const [text, setText] = useState("")
  const [language, setLanguage] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const router = useRouter()
  const [isGenerating, setIsgenerating] = useState(false)

  const handleSubmit = async () => {
    if (!userId) {
      alert("Please sign in to generate flashcards.")
      return
    }

    if (!text.trim() || !language || !difficulty) {
      alert("Please fill in all fields to generate flashcards.")
      return
    }

    try {
      setIsgenerating(() => true)
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language,
          difficulty,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate flashcards")
      }

      const data = await response.json()
      setFlashcards(data)
      setIsgenerating(() => false)
    } catch (error) {
      console.error("Error generating flashcards:", error)
      alert("An error occurred while generating flashcards. Please try again.")
      setIsgenerating(() => true)
    }
  }

  const handleCardClick = (index) => {
    SetFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
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
    const userDocRef = doc(collection(db, "users"), user.id)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || []
      if (collections.find((f) => f.name === name)) {
        alert(
          "A collection with that name already exists. Please enter a different name."
        )
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

    try {
      await batch.commit()
      handleClose()
      router.push("/flashcards")
    } catch (error) {
      console.error("Error saving flashcards:", error)
      alert("An error occurred while saving flashcards. Please try again.")
    }
  }

  return (
    <div className="flex flex-col gap-20 min-h-svh px-5 md:px-10 py-20  pt-[153px] lg:pt-[169px] pb-20">
      <Header />

      <div className="flex-1 flex flex-col justify-center items-center gap-5 md:gap-10">
        <h1 className="font-dela-gothic-one text-4xl lg:text-5xl !leading-none tracking-normal pb-2 text-white text-center">
          Generate Flashcards
        </h1>

        {isSignedIn ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 auto-rows-auto gap-5 w-full max-w-[700px]">
              <FormControl
                fullWidth
                variant="outlined"
                sx={{
                  mb: 2,
                  gridColumn: { xs: "1/3", md: "1/2" },
                  gridRow: { xs: "1/2", md: "1/2" },
                  color: "#F1F1F1",
                }}
              >
                <InputLabel
                  id="language-label"
                  sx={{ color: "#F1F1F1" }}
                >
                  Select Language
                </InputLabel>
                <Select
                  labelId="language-label"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  label="Select Language"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    bgcolor: "transparent",
                    color: "#F1F1F1",
                    paddingBlock: {
                      xs: "20px",
                      md: "24px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A385FF",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D668AA",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D668AA",
                    },
                  }}
                >
                  {Object.entries(languages).map(([name, code]) => (
                    <MenuItem
                      key={code}
                      value={code}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                fullWidth
                sx={{
                  mb: 2,
                  gridColumn: { xs: "1/3", md: "2/3" },
                  gridRow: { xs: "2/3", md: "1/2" },
                  color: "#F1F1F1",
                }}
              >
                <InputLabel
                  id="difficulty-label"
                  variant="outlined"
                  sx={{ color: "#F1F1F1" }}
                >
                  Select Difficulty
                </InputLabel>
                <Select
                  labelId="difficulty-label"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  label="Select Difficulty"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "40px",
                    color: "#F1F1F1",
                    bgcolor: "transparent",
                    paddingBlock: {
                      xs: "20px",
                      md: "24px",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#A385FF",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D668AA",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#D668AA",
                    },
                  }}
                >
                  <MenuItem value={"A1"}>A1 - Beginner</MenuItem>
                  <MenuItem value={"A2"}>A2 - Elementary</MenuItem>
                  <MenuItem value={"B1"}>B1 - Intermediate</MenuItem>
                  <MenuItem value={"B2"}>B2 - Upper Intermediate</MenuItem>
                  <MenuItem value={"C1"}>C1 - Advanced</MenuItem>
                  <MenuItem value={"C2"}>C2 - Proficient</MenuItem>
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
                sx={{
                  md: 2,
                  bgcolor: "transparent",
                  gridColumn: "1/3",
                  gridRow: { xs: "3/4", md: "2/3" },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A385FF",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D668AA",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D668AA",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#F1F1F1",
                  },
                }}
                InputProps={{
                  sx: {
                    color: "#F1F1F1",
                  },
                }}
              />

              <button
                onClick={handleSubmit}
                className="col-start-1 col-end-3 row-start-4 row-end-5 md:row-start-3 md:row-end-4 flex justify-center items-center gap-3 primary-cta text-lg lg:text-xl py-3 md:py-4"
              >
                {isGenerating ? (
                  <>
                    Generating...
                    <CircularProgress
                      size={24}
                      sx={{ color: "#010101" }}
                    />
                  </>
                ) : (
                  "Generate Flashcards"
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 lg:gap-6 items-center">
            <h2 className="font-manrope font-medium text-base lg:text-lg text-off-white !leading-normal">
              Please sign in to generate and use flashcards.
            </h2>

            <div className="flex justify-center gap-3">
              <Link
                href="/sign-in"
                className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="font-manrope font-bold -tracking-[.02em] text-base !leading-none text-white border border-pink rounded-lg py-2 px-4 lg:py-[12px] lg:px-6 ml-auto lg:ml-0"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </div>

      {flashcards.length > 0 && (
        <div className="flex flex-col items-center gap-4 lg:gap-6">
          <h2 className="font-dela-gothic-one text-3xl lg:text-4xl !leading-none tracking-normal pb-2 text-white text-center">
            Generated Flashcards
          </h2>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <button
              className="col-start-1 col-end-3 row-start-4 row-end-5 md:row-start-3 md:row-end-4 primary-cta bg-blue-gradient px-3 md:px-4 py-2 md:py-3"
              onClick={handleOpen}
            >
              Save Flashcards
            </button>
          </Box>
          <Grid
            container
            spacing={2}
          >
            {flashcards.map((flashcard, index) => (
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
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          backgroundColor: "#11111150",
          color: "#f1f1f1",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#111111",
            border: "1px solid #222222",
            color: "#F1F1F1",
            borderRadius: { xs: "16px", md: "24px" },
          },
        }}
      >
        <DialogTitle>Save Flashcards</DialogTitle>
        <DialogContent>
          <DialogContentText
            color="#f1f1f1"
            sx={{ mb: 1 }}
          >
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
            sx={{
              "& .MuiInputBase-input": {
                color: "#f1f1f1",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#222222",
              },
              "& .MuiInputLabel-root": {
                color: "#f1f1f1",
              },
            }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="error"
          >
            Cancel
          </Button>
          <Button
            onClick={saveFlashcards}
            color="secondary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
