import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import useQuery from '../../utils/useQuery'
import useUserProfile from '../../utils/useUserProfile';
import ConfirmOrder from './components/ConfirmOrder';
import OrderComplete from './components/OrderComplete';
import SelectSeats from './components/SelectSeats';
import SelectSnacks from './components/SelectSnacks';
import SelectTickets from './components/SelectTicket';

export default function Buy() {
  const router = useRouter();
  const { showtimeId, cinemaId, time } = router.query;
  const [{ isLoading, result }, setQuery] = useQuery();
  const {user} = useUserProfile();

  const cinema = result?.schedules.cinemas;
  const movie = result?.movies;
  const takenTickets = result?.tickets.map(ticket => ticket.seat_name);
  const date = result?.schedules?.date;

  useEffect(() => {
    if (showtimeId) {
      setQuery(supabase => supabase.from("movie_showtimes").select(`
        id,
        movies(name),
        schedules(date, cinemas(name, single_seat_count, double_seat_count)),
        tickets(seat_name, time)
      `)
      .eq("id", showtimeId).single()
      .eq("tickets.time", time)
      )
    }
  }, [showtimeId]);

  const [step, setStep] = useState(0);

  const [singleSeat, setSingleSeat] = useState(0);
  const [doubleSeat, setDoubleSeat] = useState(0);
  const [selectedSingleSeats, setSelectedSingleSeats] = useState([]);
  const [selectedDoubleSeats, setSelectedDoubleSeats] = useState([]);
  const [selectedSnacks, setSelectedSnacks] = useState([]);
  const [ticketTotalPrice, setTicketTotalPrice] = useState(0);
  const [snacksTotalPrice, setSnacksTotalPrice] = useState(0);

  const handleGoBack = () => setStep(s => s - 1);

  const handleDoneSelectTickets = res => {
    setSingleSeat(res.singleSeatNum);
    setDoubleSeat(res.doubleSeatNum);
    setTicketTotalPrice(res.totalPrice);
    setStep(s => s + 1);
  }

  const handleDoneSelectSeats = res => {
    setSelectedSingleSeats([...res.selectedSingleSeats]);
    setSelectedDoubleSeats([...res.selectedDoubleSeats]);
    setStep(s => s + 1);
  }

  const handleDoneSelectSnacks = res => {
    setSelectedSnacks([...res.selectedSnacks]);
    setSnacksTotalPrice(res.totalPrice);
    setStep(s => s + 1);
  }

  const handleDoneConfirmOrder = async () => {
    const { data: receipts } = await supabase.from("receipts").insert([{date: new Date().toISOString(), user_id: user.id}]);
    const receiptId = receipts[0].id; 
    const tP = supabase.from("tickets").insert(
      [
        ...selectedSingleSeats.map(s => ({ seat_name: s, movie_showtime_id: showtimeId, ticket_type_id: 1, receipt_id: receiptId, time })),
        ...selectedDoubleSeats.map(s => ({ seat_name: s, movie_showtime_id: showtimeId, ticket_type_id: 2, receipt_id: receiptId, time })),
      ]
    );
    const sP = supabase.from("receipt_snacks").insert(selectedSnacks.map(s => ({ receipt_id: receiptId, snack_id: s.id, quantity: s.amount})));
    
    await tP;
    await sP;
    setStep(s => s + 1);
  }

  return (
    <div className="w-2/3 mx-auto">
      {movie && date && (
        <>
          <p className="py-4 font-semibold text-5xl text-center text-white bg-blue-900">Đặt vé</p>
          <p className="py-4 text-4xl text-center text-white bg-blue-800">Tên phim: {movie.name}</p>
          <p className="py-4 text-4xl text-center text-white bg-blue-900">Thời gian chiếu: lúc {time}, ngày {new Date(date).toLocaleDateString()}</p>
          <p className="py-4 text-4xl text-center text-white bg-blue-800">Rạp phim: {cinema.name}</p>
        </>
      )}
      <div className="my-10">
        {step === 0 && cinema && (
          <SelectTickets singleSeat={singleSeat} doubleSeat={doubleSeat}
            singleSeatCount={cinema.single_seat_count} doubleSeatCount={cinema.double_seat_count}
            onDone={handleDoneSelectTickets} />
        )}
        {step === 1 && (
          <SelectSeats initialSelectedSingleSeats={selectedSingleSeats} initialSelectedDoubleSeats={selectedDoubleSeats}
            takenTickets={takenTickets}
            singleSeatCount={cinema.single_seat_count} doubleSeatCount={cinema.double_seat_count}
            maxSingleSeat={singleSeat} maxDoubleSeat={doubleSeat}
            onDone={handleDoneSelectSeats} onGoBack={handleGoBack} />
        )}
        {step === 2 && (
          <SelectSnacks initialSelectedSnacksAmounts={selectedSnacks.map(s => s.amount)} 
            onDone={handleDoneSelectSnacks} onGoBack={handleGoBack} />
        )}
        {step === 3 && (
          <ConfirmOrder onDone={handleDoneConfirmOrder} onGoBack={handleGoBack} 
            selectedSingleSeats={selectedSingleSeats}
            selectedDoubleSeats={selectedDoubleSeats}
            selectedSnacks={selectedSnacks}
            ticketTotalPrice={ticketTotalPrice}
            snacksTotalPrice={snacksTotalPrice}
          />
        )}
        {step === 4 && (<OrderComplete />)}
      </div>
    </div>
  )
}