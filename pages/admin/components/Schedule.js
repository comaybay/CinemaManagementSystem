import { useState } from "react";

export default function Schedule({ schedule }) {
  const [toggle, setToggle] = useState(false)
  
  return (
    <div className="text-slate-800">
      <button className="w-full py-4 px-10 bg-slate-300 hover:bg-slate-400 font-semibold"
        onClick={() => setToggle(t => !t)}>
          Ngày {new Date(schedule.date).toLocaleDateString()}
      </button>
      { toggle && schedule.movie_showtimes.map(ms => {
          const movie = ms.movies;
          return(
            <div key={ms.id} className="flex">
              <img className="h-40 w-40 object-cover" src={movie.img_url}/>
              <div>
                <p className="ml-2 mb-2">{movie.name}</p>
                {ms.times.map(t => (<span key={t} className="px-2 ml-2 rounded-md bg-blue-300">{t.slice(0, -3)}</span>))}
              </div>
            </div>
          )})
      }
    </div>
  )
}