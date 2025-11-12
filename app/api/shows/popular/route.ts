import { type NextRequest, NextResponse } from "next/server"

const OMDB_API_KEY = "2f7dc7b5"
const popularShows = [
  "Breaking Bad",
  "Game of Thrones",
  "The Office",
  "Friends",
  "The Simpsons",
  "Stranger Things",
  "The Crown",
  "Westworld",
  "Black Mirror",
  "Chernobyl",
]

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const itemsPerPage = 10
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const showsToFetch = popularShows.slice(startIndex, endIndex)

    const shows = await Promise.all(
      showsToFetch.map(async (title) => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(title)}&type=series`,
        )
        return res.json()
      }),
    )

    const validShows = shows.filter((s) => s.Response === "True")

    return NextResponse.json({ shows: validShows })
  } catch (error) {
    console.error("Error fetching popular shows:", error)
    return NextResponse.json({ error: "Failed to fetch shows" }, { status: 500 })
  }
}
