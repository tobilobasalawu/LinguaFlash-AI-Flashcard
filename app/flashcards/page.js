"use client"

import { useState, useEffect } from "react"
import { useAuth, useUser } from "@clerk/nextjs"
import {
  doc,
  collection,
  getDoc,
  setDoc,
  writeBatch,
  onSnapshot,
} from "firebase/firestore"
import { TextField, CircularProgress } from "@mui/material"
import { db } from "@/firebase"
import Header from "@/components/Header"
import Link from "next/link"

export default function Flashcard() {
  const { user } = useUser()
  const { userId } = useAuth()
  const [flashcards, setFlashcards] = useState(undefined)
  const [searchTerm, setSearchTerm] = useState("")
  const name = userId && (user.firstName || user.lastName)

  useEffect(() => {
    if (!userId) return

    const docRef = doc(collection(db, "users"), userId)

    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const collections = docSnap.data().flashcards || []
          setFlashcards(collections)
        } else {
          setDoc(docRef, { flashcards: [] })
          setFlashcards([])
        }
      },
      (error) => {
        alert("Error fetching flashcards:", error)
        setFlashcards([])
      }
    )

    return () => unsubscribe()
  }, [userId])

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredFlashcards = flashcards
    ? flashcards.filter((flashcard) =>
        flashcard.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : undefined

  async function deleteFlashcards(name) {
    const batch = writeBatch(db)
    const userDocRef = doc(collection(db, "users"), user.id)
    const docSnap = await getDoc(userDocRef)

    if (docSnap.exists()) {
      const collections = docSnap.data().flashcards || []
      const updatedCollections = collections.filter((f) => f.name !== name)

      if (collections.length === updatedCollections.length) {
        alert("Unable to delete collection, please try again later.")
        return
      }

      batch.set(userDocRef, { flashcards: updatedCollections }, { merge: true })
      await batch.commit()
    } else {
      alert("Unable to delete collection, please try again later.")
    }
  }

  return (
    <div className="flex flex-col min-h-svh px-5 md:px-10 py-20  pt-[113px] lg:pt-[129px] pb-20">
      <Header />
      <main
        className={`flex-1 flex flex-col ${
          !flashcards ? "justify-center" : ""
        } items-center gap-5 md:gap-7`}
      >
        {!flashcards ? (
          <CircularProgress size={40} />
        ) : (
          <>
            <div className="flex-none flex flex-col md:flex-row md:items-center justify-between w-full">
              <h1 className="w-full md:w-1/2 font-dela-gothic-one text-4xl lg:text-5xl !leading-[120%] tracking-normal pb-2 text-white">
                {name}'s flashcards{" "}
              </h1>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search flashcards..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{
                  mb: 2,
                  color: "#F1F1F1",
                  bgcolor: "transparent",
                  paddingBlock: {
                    xs: "20px",
                    md: "24px",
                  },
                  width: {
                    xs: "100%",
                    md: "40%",
                  },
                  maxWidth: {
                    md: "600px",
                  },
                  "& .MuiInputBase-input": {
                    color: "#f1f1f1",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#A385FF",
                    borderRadius: "8px",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D668AA",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D668AA",
                  },
                }}
              />
            </div>

            {filteredFlashcards && filteredFlashcards.length === 0 ? (
              <div className="flex-1 flex flex-col justify-center items-center gap-5 md:gap-10">
                <h1 className="font-manrope mt-8 text-center text-off-white text-xl lg:text-2xl">
                  {flashcards.length === 0
                    ? "You don't have any flashcards yet. Create some to get started!"
                    : "No matching flashcards found."}
                </h1>

                <Link
                  className="w-fit font-manrope font-bold -tracking-[.02em] text-lg lg:text-xl !leading-none text-black bg-pink-gradient rounded-2xl py-3 px-6 lg:py-4 lg:px-8 hover:bg-none hover:bg-fuchsia-400"
                  href="/new"
                >
                  New +
                </Link>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center md:justify-start gap-12 md:gap-10 w-full">
                {filteredFlashcards.map((flashcard, index) => (
                  <div
                    className="group relative w-full flex-grow md:flex-grow-0 md:w-[300px] lg:w-[390px] h-[240px]"
                    key={index}
                  >
                    <button
                      className="absolute right-5 top-5 z-20"
                      onClick={() => deleteFlashcards(flashcard.name)}
                    >
                      <svg
                        className="hidden group-hover:block hover:fill-red-700"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="#010101"
                      >
                        <path
                          fillRule="evenodd"
                          d="m6.774 6.4l.812 13.648a.8.8 0 0 0 .798.752h7.232a.8.8 0 0 0 .798-.752L17.226 6.4h1.203l-.817 13.719A2 2 0 0 1 15.616 22H8.384a2 2 0 0 1-1.996-1.881L5.571 6.4zM9.5 9h1.2l.5 9H10zm3.8 0h1.2l-.5 9h-1.2zM4.459 2.353l15.757 2.778a.5.5 0 0 1 .406.58L20.5 6.4L3.758 3.448l.122-.69a.5.5 0 0 1 .579-.405m6.29-1.125l3.94.695a.5.5 0 0 1 .406.58l-.122.689l-4.924-.869l.122-.689a.5.5 0 0 1 .579-.406z"
                        />
                      </svg>
                    </button>

                    <div className="relative z-10">
                      <Link href={`/flashcards/${flashcard.name}`}>
                        <div className="relative grid grid-cols-1 grid-rows-1 auto-rows-auto">
                          <div className="col-start-1 col-end-2 row-start-1 row-end-1 -rotate-[1.8deg] opacity-30 bg-blue w-full flex-grow md:flex-grow-0 md:w-[300px] lg:w-[390px] h-[240px] rounded-3xl"></div>
                          <div className="col-start-1 col-end-2 row-start-1 row-end-1 rotate-[4.5deg] opacity-30 bg-blue w-full flex-grow md:flex-grow-0 md:w-[300px] lg:w-[390px] h-[240px] rounded-3xl"></div>
                          <div className="relative grid place-content-center col-start-1 col-end-2 row-start-1 px-5 md:px-10 row-end-1 rotate-[1.5deg] bg-noisy-card w-full flex-grow md:flex-grow-0 md:w-[300px] lg:w-[390px] h-[240px] rounded-3xl">
                            <p className="font-dela-gothic-one text-4xl text-black line-clamp-2 text-center">
                              {flashcard.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
