export interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Year: string
  Type: string
}

export interface MovieResponse {
  movies?: Movie[]
  shows?: Movie[]
  error?: string
}
