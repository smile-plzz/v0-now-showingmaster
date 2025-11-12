import { type NextRequest, NextResponse } from "next/server"

const OMDB_API_KEY = "2f7dc7b5"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query || query.length < 2) {
      return NextResponse.json({ error: "Query too short" }, { status: 400 })
    }

    const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`)
    const data = await res.json()

    const results = data.Response === "True" ? data.Search || [] : []

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}
