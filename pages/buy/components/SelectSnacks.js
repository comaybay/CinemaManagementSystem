import { useEffect, useState } from 'react'
import useQuery from '../../../utils/useQuery';
import Button from '../../components/Button';

export default function SelectSnacks({ initialSelectedSnacksAmounts, onDone, onGoBack }) {
  const [{ isLoading, result: snacks }] = useQuery(supabase => supabase.from("snacks").select("*"));
  const [snackOrderAmounts, setSnackOrderAmounts] = useState(initialSelectedSnacksAmounts);

  useEffect(() => {
    if (!isLoading && initialSelectedSnacksAmounts.length == 0) {
      setSnackOrderAmounts(new Array(snacks.length).fill(0));
    }
  }, [isLoading])

  const calculateTotalPrice = () => snackOrderAmounts.map((s, index) => s * snacks[index].price).reduce((sum, price) => sum + price, 0);

  const handleContinue = () => {
    const selectedSnacks = snackOrderAmounts.map((amount, index) => {
      const snack = snacks[index];
      return {
        name: snack.name,
        price: snack.price,
        amount 
      };
    }).filter(s => s.amount > 0);
    
    onDone({
      selectedSnacks,
      totalPrice: calculateTotalPrice(),
    });
  }

  return (
    <>
      {isLoading && <p className="text-4xl text-blue-700 text-center">Đang tải...</p>}
      {!isLoading && (
        <div className="mx-auto w-fit">
          <p className="text-center text-5xl text-blue-700 font-semibold">Chọn đồ ăn</p>

          <table className='mt-4 border border-collapse border-white'>
            <thead>
              <tr>
                {
                  ["Tên", "Số lượng", "Giá", "Tổng"].map((t, index) => (
                    <th key={index} className="text-center rounded-t-2xl px-20 py-2 text-4xl border border-white text-white bg-blue-900">{t}</th>
                  ))
                }
              </tr>
            </thead>

            <tbody>
              {
                snacks.map((snack, index) => (
                  <tr key={snack.id} className="bg-slate-100">
                    <td className="py-2 text-slate-700 text-3xl text-center border border-white px-4">
                      <p className="font-bold text-blue-800">{snack.name}</p>
                      <p className="text-2xl">{snack.description}</p>
                    </td>
                    <td className="py-2 text-slate-700 text-3xl border border-white">
                      <div className="flex space-x-8 justify-center">
                        <button className="px-3 text-4xl rounded-lg bg-slate-200 hover:bg-slate-300"
                          onClick={() => setSnackOrderAmounts(s => {
                            const res = [...s]
                            res[index] = Math.max(s[index] - 1, 0);
                            return res;
                          })}>-</button>
                        <p>{snackOrderAmounts[index]}</p>
                        <button className="px-3 text-4xl rounded-lg bg-slate-200 hover:bg-slate-300"
                          onClick={() => setSnackOrderAmounts(s => {
                            const res = [...s]
                            res[index] = Math.min(s[index] + 1, 99);
                            return res;
                          })}>+</button>
                      </div>
                    </td>
                    <td className="py-2 text-slate-700 text-3xl text-center border border-white">{snack.price} vnđ</td>
                    <td className="py-2 text-slate-700 text-3xl text-center border border-white">{snackOrderAmounts[index] * snack.price} vnđ</td>
                  </tr>
                ))
              }
            </tbody>

          </table>

          <p className="mt-4 text-4xl text-red-700">Tổng tiền: {calculateTotalPrice()} vnđ</p>

          <div className="flex justify-between mt-4">
            <Button onClick={() => onGoBack()}>
              Quay lại
            </Button>
            <Button onClick={handleContinue}>Tiếp tục</Button>
          </div>
        </div>
      )}
    </>
  )
}