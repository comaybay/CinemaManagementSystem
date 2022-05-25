import { useRouter } from 'next/router'
import { useState } from 'react'
import useQuery from '../../../utils/useQuery';
import Button from '../../components/Button';

export default function SelectTickets({ maxSingleSeat, maxDoubleSeat, onDone }) {
  const [singleSeatNum, setSingleSeatNum] = useState(0);
  const [doubleSeatNum, setDoubleSeatNum] = useState(0);
  const [{ isLoading, result }] = useQuery(supabase => supabase.from("ticket_types").select("*"));

  const singleSeat = result?.[0];
  const doubleSeat = result?.[1];
  const totalPrice = singleSeat?.price * singleSeatNum + doubleSeat?.price * doubleSeatNum;

  const createRow = (name, num, maxTicketNum, price, setFunc) => (
    <tr key={name} className="bg-slate-100">
      <td className="py-2 text-slate-700 text-3xl text-center border border-white">{name}</td>
      <td className="py-2 text-slate-700 text-3xl border border-white">
        <div className="flex space-x-8 justify-center">
          <button className="px-3 text-4xl rounded-lg bg-slate-200 hover:bg-slate-300" 
            onClick={() => setFunc(n => Math.max(n - 1, 0))}>-</button>
            <p>{num}</p>
          <button className="px-3 text-4xl rounded-lg bg-slate-200 hover:bg-slate-300"
            onClick={() => setFunc(n => Math.min(n + 1, maxTicketNum))}>+</button>
        </div> 
        {num === maxTicketNum && <p className='text-center text-blue-700 text-xl'>Đã đạt số lượng vé có thể mua</p>}
      </td>
      <td className="py-2 text-slate-700 text-3xl text-center border border-white">{price} vnđ</td>
      <td className="py-2 text-slate-700 text-3xl text-center border border-white">{num * price} vnđ</td>
    </tr>
  )
  
  return (
    <>
      {isLoading && <p className="text-4xl text-blue-700 my-8 text-center">Đang tải...</p>}
      {!isLoading && (
      <div className="mx-auto w-fit my-8">
        <table className='border border-collapse border-white'>
          <thead>
            <tr>
            {
                ["Loại vé", "Số lượng", "Giá", "Tổng"].map((t, index) => (
                  <th key={index} className='px-20 py-2 text-4xl border border-white text-white bg-blue-700'>{t}</th>
                ))
            }
            </tr>
          </thead>

              <tbody>
                {[createRow(singleSeat.name, singleSeatNum, maxSingleSeat, singleSeat.price, setSingleSeatNum),
                  createRow(doubleSeat.name, doubleSeatNum, maxDoubleSeat, doubleSeat.price, setDoubleSeatNum)]}
              </tbody>

        </table>

        <div className="mt-8 flex justify-between space-x-8 items-center">
            <p className="text-4xl text-blue-700">Tổng tiền: {totalPrice} vnđ</p>
          <Button onClick={() => onDone({
            singleSeatNum,
            doubleSeatNum,
            totalPrice,
          })}>Tiếp tục</Button>
        </div>                  
      </div>
      )}
    </>
  )
}