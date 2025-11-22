import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import MovieGrid from "@/components/movie-grid"
import Footer from "@/components/footer"
import { Movie } from "@/types/types"

async function getPopularMovies(): Promise<Movie[]> {
  // Skip API calls during build
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_APP_URL) {
    return []
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/movies/popular`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: 'no-store' // Don't cache during build
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.movies || []
  } catch (error) {
    console.error("Error fetching movies:", error)
    return []
  }
}

async function getPopularShows(): Promise<Movie[]> {
  // Skip API calls during build
  if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_APP_URL) {
    return []
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/shows/popular`, {
      next: { revalidate: 3600 },
      cache: 'no-store' // Don't cache during build
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.shows || []
  } catch (error) {
    console.error("Error fetching shows:", error)
    return []
  }
}

export default async function Home() {
  const [popularMovies, popularShows] = await Promise.all([
    getPopularMovies(),
    getPopularShows()
  ])

  return (
    <main className="min-h-screen bg-(--color-background)">
      <Navigation />
      <Hero />

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular Movies</h2>
        <MovieGrid movies={popularMovies} />
      </section>

      <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular TV Shows</h2>
        <MovieGrid movies={popularShows} />
      </section>

      <Footer />
    </main>
  )
}
