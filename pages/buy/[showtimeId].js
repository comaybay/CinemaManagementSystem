import { useRouter } from 'next/router'
import { useEffect } from 'react';
import useQuery from '../../utils/useQuery'
import SelectTickets from './components/SelectTicket';

export default function Buy() {
  const router = useRouter();
  const { showtimeId, time } = router.query;
  
  const [{ isLoading, result}, setQuery] = useQuery();

  const cinema = result?.cinemas;
  const movie = result?.movies;
  const boughtTickets = result?.tickets;
  const date = result?.schedules?.date;

  useEffect(() => {
    if (showtimeId) {
      setQuery(supabase => supabase.from("movie_showtimes").select(`
        id,
        cinemas!movie_showtimes_cinema_id_fkey(*),
        movies(name),
        schedules(date),
        tickets(seat_name)
      `).eq("id", showtimeId).single())
    }
  }, [showtimeId]);

  return (
    <div className="w-2/3 mx-auto">
      { movie && date && (
        <>
          <p className="py-4 font-semibold text-5xl text-center text-white bg-blue-800">Đặt vé</p>
          <p className="py-4 text-4xl text-center text-white bg-blue-900">Tên phim: {movie.name}</p>
          <p className="py-4 text-4xl text-center text-white bg-blue-800">Thời gian chiếu: lúc {time}, ngày {new Date(date).toLocaleDateString()}</p>
        </>
      )}
      {cinema && (
        <SelectTickets maxSingleSeat={cinema.single_seat_count} maxDoubleSeat={cinema.double_seat_count}
          onDone={(res) => {}} />
      )}
    </div>
  )
}