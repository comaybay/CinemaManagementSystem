import { useState } from "react";
import supabase from "../../../utils/supabase";
import useQuery from "../../../utils/useQuery";
import Button from "../../components/Button";
import Schedule from "./Schedule";

export default function CinemaSection({cinema}) {
  const query = supabase =>
    supabase.from("schedules").select(`
      id, date, cinema_id,
      movie_showtimes(id, times,
        movies(id, name, img_url)))
      `).eq('cinema_id', cinema.id).order("date");

  const [{ result: schedules }, setQuery] = useQuery(query);

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errorMsg, setErrorMsg] = useState("");

  const [generating, setGenerating] = useState(false);

  const addRandom = async () => {
    setGenerating(true);

    const shuffle = arr => arr.sort(() => 0.5 - Math.random());
    const randomRange = (min, max) => Math.floor(min + Math.random() * (max - min + 1));  
    
    const {data, error} = await supabase.from("schedules").insert([{date, cinema_id: cinema.id}]);

    let schedule;
    if (!error) {
      schedule = data[0];
    }
    //Nếu lịch đã tồn tại, xóa hết phim vào lịch hôm đó của rạp
    else {
      const res = await supabase.from("schedules").select("id").eq("date", date).eq("cinema_id", cinema.id).single();
      schedule = res.data;
      await supabase.from("movie_showtimes").delete().match({schedule_id: schedule.id});

    }
    
    const {data: movieIds} = await supabase.from("movies").select("id");
    movieIds = movieIds.map(m => m.id).slice(0, randomRange(1, movieIds.length - 1));
    shuffle(movieIds);

    const times = ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00", "21:30"].map(t => `'${t}'`);
    
    const rows = movieIds.map(movie_id => {
      const start = randomRange(0, times.length - 1);
      const stop = randomRange(start + 1, times.length);
  
      return { movie_id, schedule_id: schedule.id, times: `{${times.slice(start, stop).join(",")}}` };
    });

    const { error: insertError } = await supabase.from("movie_showtimes").insert(rows);

    if (insertError) {
      console.error(insertError);
      setErrorMsg("Thêm thất bại");
      setGenerating(false);
      return;
    }

    setErrorMsg("");
    setQuery(query);

    const next = new Date(date);
    next.setDate(next.getDate() + 1);
    setDate(next.toISOString().split('T')[0]);

    setGenerating(false);
  };

  return (
    <div className="bg-slate-100 w-full max-w-6xl">
      <p className="text-4xl text-center bg-blue-600 px-20 py-2 font-semibold text-white">{cinema.name}</p>
      {schedules && schedules.map(s => (
        <Schedule key={s.id} schedule={s} />
      ))}

      <div className="mt-2 bg-slate-100 flex justify-between items-center px-4">
        <div>
          <span>Ngày: </span>
          <input type="date" className="border border-slate-700" value={date} onChange={(e) => setDate(e.target.value)}/>
          <p className="text-xl text-red-700">{errorMsg}</p>
        </div>
        <Button disabled={generating} onClick={addRandom}>Thêm ngẫu nhiên</Button>
      </div>
    </div>
  )
}