"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Play, Bookmark, Share2, Star } from "lucide-react"
import Link from "next/link"

export default function DetailsPage() {
  const params = useParams()
  const id = params.id as string
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isWatchlisted, setIsWatchlisted] = useState(false)

  useEffect(() => {
    if (!id) return

    const fetchDetails = async () => {
      try {
        const res = await fetch(`/api/movies/${id}`)
        const data = await res.json()
        setMovie(data.movie)
      } catch (error) {
        console.error("Error fetching details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  if (loading) {
    return (
      <main className="min-h-screen bg-(--color-background)">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-(--color-text-secondary)">Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-(--color-background)">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <p className="text-(--color-text-secondary)">Content not found</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Navigation />

      {/* Hero Section */}
      <div
        className="relative h-96 md:h-screen flex items-end overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${movie.Poster})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative z-10 w-full px-4 md:px-8 pb-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gradient">{movie.Title}</h1>

            <div className="flex items-center gap-4 mb-6 flex-wrap">
              {movie.imdbRating && (
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-yellow-500" />
                  <span className="text-xl font-bold">{movie.imdbRating}</span>
                </div>
              )}
              <span className="text-(--color-text-secondary)">{movie.Year}</span>
              {movie.Rated && (
                <span className="bg-(--color-primary) px-3 py-1 rounded text-white text-sm">{movie.Rated}</span>
              )}
            </div>

            <p className="text-lg text-(--color-text-secondary) mb-8 max-w-2xl">{movie.Plot}</p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href={`/watch/${movie.imdbID}`}
                className="flex items-center gap-2 bg-(--color-primary) hover:bg-(--color-primary-dark) text-white px-8 py-3 rounded-lg font-bold transition-all"
              >
                <Play size={20} />
                Play Now
              </Link>

              <button
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-all ${
                  isWatchlisted ? "bg-(--color-primary) text-white" : "bg-white/20 hover:bg-white/30 text-white"
                }`}
              >
                <Bookmark size={20} />
                {isWatchlisted ? "Watchlisted" : "Add to Watchlist"}
              </button>

              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-bold transition-all">
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {movie.Director && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Director</h3>
                <p className="text-(--color-text-secondary)">{movie.Director}</p>
              </div>
            )}

            {movie.Actors && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Cast</h3>
                <p className="text-(--color-text-secondary)">{movie.Actors}</p>
              </div>
            )}

            {movie.Genre && (
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Genre</h3>
                <div className="flex gap-2 flex-wrap">
                  {movie.Genre.split(",").map((genre) => (
                    <span key={genre} className="bg-(--color-surface) px-3 py-1 rounded text-sm">
                      {genre.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="bg-(--color-surface) rounded-lg p-6 h-fit">
            <h3 className="text-xl font-bold mb-4">Information</h3>
            <div className="space-y-4 text-sm">
              {movie.Runtime && (
                <div>
                  <p className="text-(--color-text-secondary)">Duration</p>
                  <p className="font-bold">{movie.Runtime}</p>
                </div>
              )}
              {movie.Released && (
                <div>
                  <p className="text-(--color-text-secondary)">Released</p>
                  <p className="font-bold">{movie.Released}</p>
                </div>
              )}
              {movie.Language && (
                <div>
                  <p className="text-(--color-text-secondary)">Language</p>
                  <p className="font-bold">{movie.Language}</p>
                </div>
              )}
              {movie.Country && (
                <div>
                  <p className="text-(--color-text-secondary)">Country</p>
                  <p className="font-bold">{movie.Country}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
