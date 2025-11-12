import { type NextRequest, NextResponse } from "next/server"

const OMDB_API_KEY = process.env.OMDB_API_KEY || "2f7dc7b5"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`)
    const data = await res.json()

    if (data.Response === "False") {
      return NextResponse.json({ error: "Movie not found" }, { status: 404 })
    }

    return NextResponse.json({ movie: data })
  } catch (error) {
    console.error("Error fetching movie details:", error)
    return NextResponse.json({ error: "Failed to fetch movie" }, { status: 500 })
  }
}
