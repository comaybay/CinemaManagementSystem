import { useEffect, useState } from "react";
import useQuery from "../../utils/useQuery"
import MovieCard from './MovieCard';

export default function NowAiring({cinema}) {
  const query = (supabase) => {
    const today = new Date().toISOString().split('T')[0]
    return supabase.from('schedules').select(`
        movies(id, name, english_name, img_url)
      `)
      .eq("date", today)
      .eq("cinema_id", cinema.id)
  };

  const resultSelect = result => result.data.length > 0 ? result.data[0].movies : [];

  const [{ isLoading: isMoviesLoading, result: movies }, setQuery] = useQuery(query, resultSelect);

  const [limit, setLimit] = useState(0);

  useEffect(() => {
    setQuery(query, resultSelect);
  }, [cinema])

  useEffect(() => {
    if (isMoviesLoading) 
      return;
    
    setLimit(l => Math.min(l + 6, movies.length));
  }, [isMoviesLoading])

  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    if (!isMoviesLoading) {
      setShowButton(limit !== movies.length);
    }
  }, [limit, isMoviesLoading])

  const handleSeeMore = _ => {
    setLimit(l => Math.min(l + 6, movies.length));
  } 

  return (
    <div className="tab-pane active">
      <div className="movieBox">
        {isMoviesLoading  && <p className="mx-auto block text-3xl text-blue-700">Đang tải...</p>}
        {!isMoviesLoading && movies.length === 0 && <p className="mx-auto block text-3xl text-blue-700">Hôm nay không có lịch chiếu phim</p> }
        {!isMoviesLoading && movies.slice(0, limit).map(m => <MovieCard key={m.id} movie={m} />)}
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