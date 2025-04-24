import React from 'react'
import { Card, Rate } from 'antd'
import { format } from 'date-fns'

import './MovieCards.css'
import NO_POSTER_IMAGE from '../../IMG/no-poster.png'

const MovieCards = ({ movie, genres, onRateChange, userRating }) => {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    const truncated = text.slice(0, maxLength)
    return truncated.slice(0, truncated.lastIndexOf(' ')) + '...'
  }

  const formatReleaseDate = (releaseDate) => {
    const date = new Date(releaseDate)
    return isNaN(date.getTime()) ? 'Unknown' : format(date, 'MMMM d, yyyy')
  }

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((genre) => genre.id === id)
        return genre ? genre.name : ''
      })
      .join(', ')
  }

  const getRatingColor = (rating) => {
    if (rating >= 0 && rating < 3) return '#E90000'
    if (rating >= 3 && rating < 5) return '#E97E00'
    if (rating >= 5 && rating < 7) return '#E9D100'
    if (rating >= 7) return '#66E900'
    return '#E9D100'
  }

  const starRating = userRating !== undefined ? userRating : 0

  return (
    <Card hoverable className="movie-card" cover={null}>
      <div className="movie-card-content">
        <div className="movie-poster">
          <img
            alt={movie.title || 'No poster available'}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : NO_POSTER_IMAGE
            }
            className={`movie-poster-img ${!movie.poster_path ? 'no-poster-img' : ''}`}
            onError={(e) => {
              e.target.src = NO_POSTER_IMAGE
            }}
          />
        </div>
        <div className="movie-content">
          <div className="movie-header">
            <h3 className="movie-title">{movie.title}</h3>
            <span
              className="movie-rating-circle"
              style={{ backgroundColor: getRatingColor(movie.vote_average) }}
            >
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <p className="movie-release">
            <strong>Release Date:</strong>{' '}
            {formatReleaseDate(movie.release_date)}
          </p>
          <p className="movie-description">
            {truncateText(movie.overview, 200)}
          </p>
          <p className="movie-genres">
            <strong>Genres:</strong> {getGenreNames(movie.genre_ids)}
          </p>
          <div className="movie-stars">
            <Rate
              allowHalf
              count={10}
              value={starRating}
              onChange={(value) => onRateChange(movie.id, value || 0.5)} // Убедимся, что минимум 0.5
              className="movie-rate"
              disabled={false}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

export default MovieCards
