"use client"
import React from "react"
import { Movie } from "@/types/types"

import { Skeleton } from "@/components/ui/skeleton"
import MovieCard from "./movie-card"


export default function MovieGrid({
  movies,
  isLoading = false,
}: {
  movies: Movie[]
  isLoading?: boolean
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg" />
        ))}
      </div>
    )
  }

  if (!movies.length) {
    return (
      <div className="text-center py-12">
        <p className="text-(--color-text-secondary) text-lg">No content found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}
