"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"

interface Movie {
  imdbID: string
  Title: string
  Type: string
}

export default function VideoPlayer({ movie, selectedSource }: { movie: Movie; selectedSource: number }) {
  const [error, setError] = useState(false)

  // Video source URLs - these would come from your API in production
  const videoSources = [
    `https://vidsrc.to/embed/${movie.Type === "series" ? "tv" : "movie"}/${movie.imdbID}`,
    `https://vidsrc.xyz/embed/${movie.Type === "series" ? "tv" : "movie"}/${movie.imdbID}`,
    `https://multiembed.mov/?video_id=${movie.imdbID}`,
    `https://2embed.cc/embed/${movie.imdbID}`,
    `https://superembed.stream/${movie.Type === "series" ? "tv" : "movie"}/${movie.imdbID}`,
    `https://moviesapi.club/${movie.Type === "series" ? "tv" : "movie"}/${movie.imdbID}`,
  ]

  return (
    <div className="w-full bg-(--color-surface) rounded-lg overflow-hidden">
      {error ? (
        <div className="flex items-center justify-center h-96 bg-(--color-background)">
          <div className="text-center">
            <AlertCircle size={48} className="text-(--color-primary) mx-auto mb-4" />
            <p className="text-(--color-text-secondary)">Unable to load video from this source</p>
            <p className="text-sm text-(--color-text-muted) mt-2">Try another source or check your connection</p>
          </div>
        </div>
      ) : (
        <iframe
          src={videoSources[selectedSource]}
          className="w-full h-screen md:h-96 border-none rounded-lg"
          allowFullScreen
          onError={() => setError(true)}
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  )
}
