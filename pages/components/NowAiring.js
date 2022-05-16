import { useEffect, useState } from "react";
import useQuery from "../../utils/useQuery"
import MovieCard from './MovieCard';

export default function NowAiring() {
  const [movieCount, setMovieCount] = useState(0);
  const [{ isLoading: isMoviesLoading, result: movies }, setQuery] = useQuery(
    supabase => {
      const today = new Date().toISOString().split('T')[0]
      return supabase.from("movies").select(`
        id, name, english_name, img_url,
        schedules!inner (date)
      `, {count: 'exact'})
      .eq("schedules.date", today)
      .limit(6);
    },
    result => {
      setMovieCount(result.count);
      return result.data;
    }
  );

  useEffect(() => {
    if (isMoviesLoading) 
      return;

    setShowButton(movieCount > 6 && movies.length <= 6)
  }, [isMoviesLoading])

  const [showButton, setShowButton] = useState(true);

  const handleSeeMore = _ => {
    setQuery(supabase => {
        const today = new Date().toISOString().split('T')[0]
        return supabase.from("movies").select(`
          id, name, english_name, img_url,
          schedules!inner (date)
        `)
        .eq("schedules.date", today);
      });
  } 

  return (
    <div className="tab-pane active">
      <div className="movieBox">
        {isMoviesLoading  && <p className="mx-auto block text-3xl text-blue-700">Đang tải...</p>}
        {!isMoviesLoading && movies.length === 0 && <p className="mx-auto block text-3xl text-blue-700">Hôm nay không có lịch chiếu phim</p> }
        {!isMoviesLoading && movies.map(m => <MovieCard key={m.id} movie={m} />)}
      </div>
      <div className="flex flex-row-reverse mb-10">
        {
          showButton &&
          <button onClick={handleSeeMore} className="btn hover:bg-blue-700 hover:text-white">
            xem thêm
          </button>
        }
      </div>
    </div>
  ) 
}