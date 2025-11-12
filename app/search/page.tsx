"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!query) return

    const fetchResults = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await res.json()
        setResults(data.results || [])
      } catch (error) {
        console.error("Error searching:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [query])

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Navigation />

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Search Results</h1>
        <p className="text-(--color-text-secondary) mb-8">
          Results for: <span className="text-white font-bold">{query}</span>
        </p>
        <MovieGrid movies={results} isLoading={loading} />
      </section>

      <Footer />
    </main>
  )
}
