import { useEffect, useState } from "react";
import useQuery from "../../utils/useQuery";
import MovieCard from "./MovieCard";

export default function ComingSoon({cinema}) {
  const querySchedules = supabase => {
    const format = d => d.toISOString().split('T')[0]
    const today = new Date()
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return supabase.from('schedules').select(`
        id, date, cinema_id,
        movies(id, name, english_name, img_url)
      `)
      .eq("cinema_id", cinema.id)
      .gt("date", format(today))
      .lte("date", format(lastDay))
      .order("date")
  };


  const [{ isLoading: isSchedulesLoading, result: schedules }, setQuerySchedules] = useQuery(querySchedules);

  useEffect(() =>  {
    setQuerySchedules(querySchedules);
  }, [cinema]);

  const [comingSoonSchedule, setComingSoonSchedule] = useState({movies: []})
  
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  
  useEffect(() => {
    if (!isSchedulesLoading) {
      const newComingSoonSchedule = {movies: []} 
      const movieIdSet = new Set();
      schedules.forEach(s => {
        s.movies.forEach(m => {
          if (!movieIdSet.has(m.id)) {
            newComingSoonSchedule.movies.push(m);
            movieIdSet.add(m.id);
          } 
        })
      });
      setComingSoonSchedule(newComingSoonSchedule);
      setSelectedSchedule(newComingSoonSchedule);
    }
  }, [isSchedulesLoading])

  console.log(selectedSchedule);

  return (
    <div className="tab-pane active">
      {isSchedulesLoading && <p className="mx-auto block text-3xl text-blue-700">Đang tải...</p>}
      {!isSchedulesLoading  && (
        <>
          <div className="text-3xl flex space-x-4 items-center">
            <button 
              className={`${comingSoonSchedule === selectedSchedule ? "border-2 border-white bg-blue-600 text-white" : "border-2 border-blue-600 text-blue-600 hover:bg-blue-200"}
                 py-3 px-6 rounded-lg`}
              onClick={() => setSelectedSchedule(comingSoonSchedule)}>
              Sắp chiếu
            </button>

            {schedules.map((s, i) => (
              <button key={s.id} 
                className={`${schedules[i] === selectedSchedule ? "border-2 border-white bg-blue-600 text-white" : "border-2 border-blue-600 text-blue-600 hover:bg-blue-200"}
                 py-3 px-6 rounded-lg`}
                onClick={() => setSelectedSchedule(schedules[i])}
              >{new Date(s.date).getDate()}</button>)
            )}
            </div>
          <div className="movieBox w-full mt-4">
              {(!selectedSchedule || selectedSchedule.movies.length <= 0) && <p className="mx-auto block text-3xl text-blue-700">Hiện tại chưa có phim sắp chiếu</p>}
              {selectedSchedule && selectedSchedule.movies.map(m => <MovieCard key={m.id} movie={m} />)}
          </div>
        </>
      )}
    </div>
  )
}