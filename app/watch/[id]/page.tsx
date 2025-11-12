"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import VideoPlayer from "@/components/video-player"

export default function WatchPage() {
  const params = useParams()
  const id = params.id as string
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSource, setSelectedSource] = useState(0)

  useEffect(() => {
    if (!id) return

    const fetchMovie = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`)
        const data = await res.json()
        setMovie(data.movie)
      } catch (error) {
        console.error("Error fetching movie:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [id])

  if (loading || !movie) {
    return (
      <main className="min-h-screen bg-(--color-background)">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <p className="text-(--color-text-secondary)">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Navigation />

      <section className="py-8 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-(--color-text-secondary)">{movie.Year}</p>
        </div>

        <VideoPlayer movie={movie} selectedSource={selectedSource} />

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Available Sources</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((source) => (
              <button
                key={source}
                onClick={() => setSelectedSource(source - 1)}
                className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                  selectedSource === source - 1
                    ? "bg-(--color-primary) text-white"
                    : "bg-(--color-surface) text-(--color-text-secondary) hover:bg-(--color-surface-light)"
                }`}
              >
                Source {source}
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
