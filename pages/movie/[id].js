import useQuery from "../../utils/useQuery"
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Movie() {
  const format = d => d.toISOString().split('T')[0]
  const router = useRouter();
  const {id} = router.query;

  const [{isLoading: isMovieLoading, result: movie}, setQueryMovie] = useQuery(null);
  const [{isLoading: isShowtimeLoading, result: showtimes }, setQueryShowtime] = useQuery(null);
  
  const [date, setDate] = useState(format(new Date()))

  useEffect(() => { 
    if (id) {
      setQueryMovie(
        supabase => supabase.from("movies").select("*").eq("id", id),
        result => result.data.length > 0 ? result.data[0] : null
      );
    }
  }, [id])

  useEffect(() => {
    if (id) {
      setQueryShowtime(
        supabase => supabase.from("cinemas").select(`
          id, name,
          schedules(date, movie_showtimes(id, movie_id, times))
        `)
        .eq("schedules.movie_showtimes.movie_id", id)
        .eq("schedules.date", date),
        result => result.data.filter(d => d.schedules.length > 0).map(d => ({
          cinemaName: d.name,
          cinemaId: d.id,
          showtimeId: d.schedules[0].movie_showtimes[0].id,
          times: d.schedules[0].movie_showtimes[0].times
        }))
      )
    }
  }, [date, id]);

  return <div className="text-2xl flex flex-col items-center my-10 mx-[300px] text-slate-700">
    {!isMovieLoading && !movie &&(
      <>
        <p className="font-bold text-7xl text-blue-700">404</p>
        <p className="text-3xl text-blue-700">Phim không tồn tại</p>
      </>
    )}
    {!isMovieLoading && movie && (
      <>
        <div className="flex">
          <img className="object-cover w-[300px]" src={movie.img_url} alt={movie.name} />
          <div className="ml-4 flex flex-col space-y-2">
            <p className="text-5xl font-semibold">{movie.name}</p>
            <p className="text-5xl font-semibold text-gray-400">{movie.english_name}</p>
            <p className="mt-4">
              <span className="text-blue-700">Ngày khởi chiếu: </span>
              {movie.release_date}
            </p>
            <p>
              <span className="text-blue-700">Quốc gia: </span>
              {movie.country}
            </p>
            <p>
              <span className="text-blue-700">Đơn vị chế tác: </span>
              {movie.production_company}
            </p>
            <p>
              <span className="text-blue-700">Thể loại: </span>
              {movie.gerne}
            </p>
            <p>
              <span className="text-blue-700">Diễn viên: </span>
              {movie.actors}
            </p>
            <p style={{ display: "-webkit-box", "-webkit-line-clamp": "8", "-webkit-box-orient": "vertical", overflow: "hidden" }}>
              <span className="text-blue-700">Nội dung phim: </span>
              {movie.description}
            </p>
          </div>
        </div>
        <div className="mt-4 w-full">
          <div>
            <p className="text-5xl font-semibold text-blue-700">Lịch chiếu</p>
            <div className="mt-2 border-b border-blue-700 opacity-80"></div>
            <div className="mt-3">
              <span className="font-semibold text-blue-700">Chọn ngày: </span>
              <input type="date" className="border border-blue-700 p-2" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
          {
            isShowtimeLoading && (
              <p className="mt-4 text-blue-700">Đang tải...</p>
            )
          }
          {
            !isShowtimeLoading && showtimes.length == 0 && (
              <p className="mt-4 text-red-500">Không có lịch chiếu cho ngày này.</p>
            )
          }
            {!isShowtimeLoading &&
              showtimes.map(showtime => (
                <div className="mt-8 min-w-[400px]">
                  <p className="text-3xl text-white bg-blue-900 px-4 py-2">{showtime.cinemaName}</p>
                  <div className="px-2 py-3 bg-slate-200">
                    {showtime.times.map(t => (
                      <Link href={`/buy/${showtime.showtimeId}?time=${t.slice(0, -3)}&cinemaId=${showtime.cinemaId}`}>
                        <button key={t} className="px-4 py-2 ml-2 rounded-md bg-blue-600 hover:bg-blue-900 text-white text-3xl font-semibold">
                          {t.slice(0, -3)}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              ))
            }
        </div>
      </>
    )}
  </div>
}