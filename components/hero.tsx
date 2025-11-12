"use client"

import { useState, useEffect } from "react"
import { Play, Info } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  const [randomMovie, setRandomMovie] = useState(null)

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const res = await fetch("/api/movies/featured")
        const data = await res.json()
        setRandomMovie(data.movie)
      } catch (error) {
        console.error("Error fetching featured movie:", error)
      }
    }

    fetchRandomMovie()
  }, [])

  if (!randomMovie) {
    return (
      <div className="h-96 bg-gradient-to-b from-black/50 to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-(--color-text-secondary)">Loading featured content...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative h-96 md:h-[500px] lg:h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.4)), url(${randomMovie.Poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-gradient">{randomMovie.Title}</h1>

        <p className="text-lg text-(--color-text-secondary) mb-6 max-w-2xl line-clamp-3">
          {randomMovie.Plot || "Discover amazing content"}
        </p>

        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          <Link
            href={`/watch/${randomMovie.imdbID}`}
            className="flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white px-8 py-3 rounded-lg font-bold transition-all"
          >
            <Play size={20} />
            Play
          </Link>

          <Link
            href={`/details/${randomMovie.imdbID}`}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-bold transition-all"
          >
            <Info size={20} />
            More Info
          </Link>
        </div>
      </div>
    </div>
  )
}
