"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([])
  const [popularShows, setPopularShows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInitialContent = async () => {
      try {
        // Fetch popular movies
        const movieRes = await fetch("/api/movies/popular")
        const movieData = await movieRes.json()
        setPopularMovies(movieData.movies || [])

        // Fetch popular shows
        const showRes = await fetch("/api/shows/popular")
        const showData = await showRes.json()
        setPopularShows(showData.shows || [])
      } catch (error) {
        console.error("Error fetching content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialContent()
  }, [])

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Navigation />
      <Hero />

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular Movies</h2>
        <MovieGrid movies={popularMovies} isLoading={loading} />
      </section>

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular TV Shows</h2>
        <MovieGrid movies={popularShows} isLoading={loading} />
      </section>

      <Footer />
    </main>
  )
}
