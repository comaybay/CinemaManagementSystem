import { useState } from "react";
import Button from "../../components/Button";

export default function SelectSeats({ initialSelectedSingleSeats, initialSelectedDoubleSeats, takenTickets, maxSingleSeat, maxDoubleSeat, singleSeatCount, doubleSeatCount, onDone, onGoBack }) {
  const [layoutSingleSeat] = useState(() => makeLayout(singleSeatCount, 12));
  const [layoutDoubleSeat] = useState(() => makeLayout(doubleSeatCount, 6, "D"));
  
  function makeLayout(seatCount, seatsPerRow, prefix = "") {
    const layout = new Array(Math.ceil(seatCount / seatsPerRow)).fill(0).map(() => []); 
    for (let i = 0; i < seatCount; i++) {
      const rowIndex = Math.floor(i / seatsPerRow);
      const colIndex = i % seatsPerRow;
      const letter = String.fromCodePoint("A".codePointAt(0) + rowIndex);
      layout[rowIndex].push(prefix + letter + `${colIndex + 1}`.padStart(2, '0'));
    }
    return layout;
  }

  const [selectedSingleSeatCount, setSelectedSingleSeatCount] = useState(initialSelectedSingleSeats.length > 0 ? 0 : maxSingleSeat);
  const [selectedDoubleSeatCount, setSelectedDoubleSeatCount] = useState(initialSelectedDoubleSeats.length > 0 ? 0 : maxDoubleSeat);
  const [selectedSingleSeats, setSelectedSingleSeats] = useState(initialSelectedSingleSeats);
  const [selectedDoubleSeats, setSelectedDoubleSeats] = useState(initialSelectedDoubleSeats);

  function handleSelectHelper(seat, seatCount, setterSeats, setterCount) {
    setterSeats(seats => {
      if (seats.includes(seat)) {
        setterCount(c => c + 1);
        return seats.filter(s => s !== seat);
      }

      if (seatCount === 0 || takenTickets.includes(seat)) {
        return seats;
      }

      setterCount(c => c - 1);
      return [...seats, seat];
    })
  }

  function handleSelectSingleSeat(seat) {
    handleSelectHelper(seat, selectedSingleSeatCount, setSelectedSingleSeats, setSelectedSingleSeatCount);
  }

  function handleSelectDoubleSeat(seat) {
    handleSelectHelper(seat, selectedDoubleSeatCount, setSelectedDoubleSeats, setSelectedDoubleSeatCount);
  }

  function createTakenSingleSeat(seat, index) {
    const baseStyle = "w-[55px] text-3xl p-2 rounded-lg border-2 font-semibold"
    const style = "text-gray-400 border-gray-400 bg-gray-200"
    return (
      <button disabled key={seat} className={`${baseStyle} ${style} ${index === 6 ? 'ml-20 mr-2' : 'mx-2'}`}>
        {seat}
      </button>) 
  }

  function createExampleSingleSeat() {
    const baseStyle = "w-[55px] text-3xl p-2 rounded-lg border-2 font-semibold"
    const notSelected = "text-sky-700 border-sky-700 hover:bg-sky-300"
    return (
      <button disabled className={`${baseStyle} ${notSelected} mx-2`}>
        Gh???
      </button>
    ) 
  }

  function createSingleSeat(seat, index) {
    if (takenTickets.includes(seat)) {
      return createTakenSingleSeat(seat, index);
    }

    const baseStyle = "w-[55px] text-3xl p-2 rounded-lg border-2 font-semibold"
    const notSelected = "text-sky-700 border-sky-700 hover:bg-sky-300"
    const selected = "bg-sky-700 border-sky-900 text-white hover:bg-sky-900"
    const style = selectedSingleSeats.includes(seat) ? selected : notSelected;
    return (
      <button key={seat} className={`${baseStyle} ${style} ${index === 6 ? 'ml-20 mr-2' : 'mx-2'}`}
        onClick={() => handleSelectSingleSeat(seat)}>
        {seat}
      </button>) 
  }

  function createTakenDoubleSeat(seat, index) {
    const baseStyle = "w-[120px] text-3xl p-2 rounded-lg border-2 font-semibold"
    const style = "text-gray-400 border-gray-400 bg-gray-200"
    return (
      <button disabled key={seat} className={`${baseStyle} ${style} ${index === 6 ? 'ml-20 mr-2' : 'mx-2'}`}>
        {seat}
      </button>)
  }

  function createExampleDoubleSeat() {
    const baseStyle = "w-[120px] text-3xl p-2 rounded-lg border-2 font-semibold"
    const notSelected = "text-indigo-700 border-indigo-700 hover:bg-indigo-300"
    return (
      <button disabled className={`${baseStyle} ${notSelected} mx-2`}>
        Gh???
      </button>
    )
  }

  function createDoubleSeat(seat, index = 0) {
    if (takenTickets.includes(seat)) {
      return createTakenDoubleSeat(seat, index);
    }

    const baseStyle = "w-[120px] text-3xl p-2 rounded-lg border-2 font-semibold"
    const notSelected = "text-indigo-700 border-indigo-700 hover:bg-indigo-300"
    const selected = "bg-indigo-700 border-indigo-900 text-white hover:bg-indigo-900"
    const style = selectedDoubleSeats.includes(seat) ? selected : notSelected;

    return (
      <button key={seat} className={`${baseStyle} ${style} ${index === 3 ? 'ml-20 mr-2' : 'mx-2'}`}
        onClick={() => handleSelectDoubleSeat(seat)}>
        {seat}
      </button>)
  }

  return (
    <div className="text-2xl flex flex-col items-center text-slate-700">
      <p className="text-5xl text-blue-700 font-semibold">Ch???n gh???</p>
      <div className="mt-6 flex space-x-16">
        <div className="font-semibold">
          <div className="flex items-center">
            {createExampleSingleSeat()} 
            <span>: Gh??? ????n tr???ng</span>
          </div>
          <div className="flex items-center mt-2">
            {createTakenSingleSeat("Gh???")}
            <span>: Gh??? ????n ???? c?? ng?????i</span>
          </div>
        </div>
        <div className="font-semibold">
          <div>
            {createExampleDoubleSeat()}
            <span>: Gh??? ????i tr???ng</span>
          </div>
          <div className="flex items-center mt-2">
            {createTakenDoubleSeat("Gh???")}
            <span>: Gh??? ????i ???? c?? ng?????i</span>
          </div>
        </div>
      </div>
      <div>
        <div className="mt-4 flex flex-col items-center py-4 px-8 border-2">
          <p className="text-blue-700 font-semibold">Nh???p v??o gh??? tr???ng ????? ch???n gh???, nh???p l???n n???a ????? h???y ch???n gh???</p>
          <div className="flex space-x-16">
            <p className="text-sky-700">S??? gh??? ????n c???n ch???n: <span className="font-semibold">{selectedSingleSeatCount}</span></p>
            <p className="text-indigo-700">S??? gh??? ????i c???n ch???n: <span className="font-semibold">{selectedDoubleSeatCount}</span></p>
          </div>
          <div className="mt-2">
          {
            layoutSingleSeat.map((row, index) => (
              <div key={index} className="flex mt-2">
                {
                  row.map(createSingleSeat)
                }
              </div>
            ))
          }
          <div className="mt-4">
            {
              layoutDoubleSeat.map((row, index) => (
                <div key={index} className="flex mt-2">
                  {
                    row.map(createDoubleSeat)
                  }
                </div>
              ))
            }
          </div>
        </div>
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={() => onGoBack()}>
            Quay l???i
          </Button>
          <Button disabled={selectedSingleSeatCount != 0 || selectedDoubleSeatCount != 0} 
            onClick={() => onDone({
              selectedSingleSeats,
              selectedDoubleSeats,
            })}>
            Ti???p t???c
          </Button>
        </div>
      </div>
  </div>  
  )
}