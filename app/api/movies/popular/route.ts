import { type NextRequest, NextResponse } from "next/server"

const OMDB_API_KEY = "2f7dc7b5"
const popularMovies = [
  "Inception",
  "The Matrix",
  "Interstellar",
  "Avatar",
  "Titanic",
  "Jurassic Park",
  "Forrest Gump",
  "Gladiator",
  "Pulp Fiction",
  "The Lion King",
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const itemsPerPage = 10
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const moviesToFetch = popularMovies.slice(startIndex, endIndex)

    const movies = await Promise.all(
      moviesToFetch.map(async (title) => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&type=movie`,
        )
        return res.json()
      }),
    )

    const validMovies = movies.filter((m) => m.Response === "True")

    return NextResponse.json({ movies: validMovies })
  } catch (error) {
    console.error("Error fetching popular movies:", error)
    return NextResponse.json({ error: "Failed to fetch movies" }, { status: 500 })
  }
}
