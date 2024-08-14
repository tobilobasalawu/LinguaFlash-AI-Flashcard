import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
You are a language learning flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`

export async function POST(req) {
  const openai = new OpenAI()
  const data = await req.text()

  // We'll implement the OpenAI API call here
}