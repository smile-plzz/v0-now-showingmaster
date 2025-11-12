"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Play, Bookmark } from "lucide-react"

interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Year: string
  Type: string
}

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isWatchlisted, setIsWatchlisted] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsWatchlisted(!isWatchlisted)
    // TODO: Save to localStorage or database
  }

  const posterUrl = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "/abstract-movie-poster.png"

  return (
    <Link href={`/details/${movie.imdbID}`}>
      <div className="relative group cursor-pointer rounded-lg overflow-hidden">
        {/* Poster Image */}
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-(--color-surface)">
          {!imageError ? (
            <img
              src={posterUrl || "/placeholder.svg"}
              alt={movie.Title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-(--color-surface) to-(--color-surface-light)">
              <span className="text-(--color-text-muted) text-center px-2">{movie.Title}</span>
            </div>
          )}

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={48} className="text-(--color-primary)" />
          </div>

          {/* Type Badge */}
          <div className="absolute top-2 right-2">
            <span className="bg-(--color-primary) text-white text-xs font-bold px-2 py-1 rounded">
              {movie.Type === "series" ? "TV" : "Movie"}
            </span>
          </div>

          {/* Watchlist Button */}
          <button
            onClick={handleWatchlist}
            className={`absolute top-2 left-2 p-2 rounded-full transition-colors ${
              isWatchlisted ? "bg-(--color-primary) text-white" : "bg-black/50 text-white hover:bg-(--color-primary)"
            }`}
          >
            <Bookmark size={20} />
          </button>
        </div>

        {/* Title */}
        <div className="mt-3">
          <h3 className="font-bold text-sm line-clamp-2 text-(--color-text-primary)">{movie.Title}</h3>
          <p className="text-xs text-(--color-text-secondary) mt-1">{movie.Year}</p>
        </div>
      </div>
    </Link>
  )
}
