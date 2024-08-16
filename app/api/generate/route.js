import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
You are a language learning flashcard creator, you have to create 10 flashcards based on given inputs.
The mode of communication is English, and user will specify target language they want to learn. 
Both front and back of flashcards can be either words, phrases or a sentence. Mention instruction before it.
You should respond in the following JSON format, adding your content into the values of front & back:
{
  "flashcards":[
    {
      "front": "front content",
      "back": "back content"
    }
  ]
}

`

export async function POST(req) {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, })
  const data = await req.json(); // Use .json() for JSON payload
  const { text, language, difficulty } = data;
  const userData = `Target language - ${language}
  Current level - ${difficulty}
  Additional Info - ${text}`
  // We'll implement the OpenAI API call here
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userData },
    ],
    model: 'gpt-4o',
    response_format: { type: 'json_object' },
  })

  // Parse the JSON response from the OpenAI API
  const flashcards = JSON.parse(completion.choices[0].message.content)

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards)
}
