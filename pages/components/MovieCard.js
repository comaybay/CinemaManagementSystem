import Link from "next/link";

export default function MovieCard({movie}) {
  return (
    <Link href={`phim/${movie.id}`} >
      <div className="movieItem cursor-pointer">
        <div className="movieImg object-">
          <img src={movie.img_url} alt={movie.name} />
        </div>
        <div className="movie-Title">
          <h4 className="upper-text">{movie.name}</h4>
          <h4 className="vn upper-text">{movie.english_name}</h4>
        </div>
      </div>
    </Link>
  )
}
