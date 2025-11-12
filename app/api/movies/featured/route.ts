import { NextResponse } from "next/server"

const OMDB_API_KEY = "2f7dc7b5"
const featuredMovies = ["Inception", "The Matrix", "Interstellar", "Avatar", "Dune"]

export async function GET() {
  try {
    const randomMovie = featuredMovies[Math.floor(Math.random() * featuredMovies.length)]

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(randomMovie)}&type=movie`,
    )
    const data = await res.json()

    if (data.Response === "True") {
      return NextResponse.json({ movie: data })
    }

    return NextResponse.json({ movie: null })
  } catch (error) {
    console.error("Error fetching featured movie:", error)
    return NextResponse.json({ movie: null }, { status: 500 })
  }
}
