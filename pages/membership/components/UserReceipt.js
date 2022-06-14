import formatPrice from '../../../utils/formatPrice';
import useQuery from '../../../utils/useQuery';


export default function UserReceipts() {
  const [{isLoading, result: receipts}] = useQuery(supabase => 
    supabase.from("receipts").select(`
      date, receipt_code, tickets(time), price, movie_showtimes(movies(name, id))
    `).eq("user_id", supabase.auth.user().id).order('date', { ascending: false })
  );

  console.log(receipts);

  return (
    <div className="text-2xl">
      {
        !isLoading && receipts.map(r => (
          <div className="p-4 mb-4 border-2">
            <p className="font-semibold text-slate-700">{new Date(r.date + "Z").toLocaleString()}</p>
            <p className="text-blue-700">Mã biên lai: <span className="font-semibold">{r.receipt_code}</span></p>
            <p>Tên phim: <span className="font-semibold">{r.movie_showtimes[0].movies.name}</span></p>
            <p>Mã phim: <span className="font-semibold">{r.movie_showtimes[0].movies.id}</span></p>
            <p className="text-red-700">Tổng tiền: <span className="font-semibold">{formatPrice(r.price)}</span></p>
          </div>
        ))
      }
    </div>
  )
}