"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
      setQuery("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies, shows, actors..."
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-(--color-text-muted) focus:outline-none focus:border-(--color-primary) transition-colors"
        />
        <button
          type="submit"
          className="bg-(--color-primary) hover:bg-(--color-primary-dark) text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
        >
          <Search size={20} />
          Search
        </button>
      </div>
    </form>
  )
}
