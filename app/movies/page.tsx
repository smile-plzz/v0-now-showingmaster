"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/movies/popular?page=${page}`)
        const data = await res.json()
        setMovies(page === 1 ? data.movies : [...movies, ...(data.movies || [])])
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [page])

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Navigation />

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Browse Movies</h1>
        <MovieGrid movies={movies} isLoading={loading} />

        {!loading && (
          <div className="text-center mt-12">
            <button
              onClick={() => setPage(page + 1)}
              className="bg-(--color-primary) hover:bg-(--color-primary-dark) text-white px-8 py-3 rounded-lg font-bold transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
