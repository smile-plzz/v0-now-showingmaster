"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load watchlist from localStorage
    try {
      const saved = localStorage.getItem("watchlist")
      if (saved) {
        setWatchlist(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Error loading watchlist:", error)
    }
  }, [])

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Navigation />

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">My Watchlist</h1>

        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-(--color-text-secondary) text-lg mb-4">Your watchlist is empty</p>
            <p className="text-(--color-text-muted)">
              Start adding movies and shows to your watchlist to see them here
            </p>
          </div>
        ) : (
          <MovieGrid movies={watchlist} isLoading={loading} />
        )}
      </section>

      <Footer />
    </main>
  )
}
