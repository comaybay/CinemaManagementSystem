import useUserProfile from "../../../utils/useUserProfile"
import Button from "../../components/Button";

export default function ConfirmOrder({ 
  onDone, onGoBack,
  selectedSingleSeats, 
  selectedDoubleSeats,
  selectedSnacks,
  ticketTotalPrice,
  snacksTotalPrice
 }) {
  const { isProfileLoading, user, profile} = useUserProfile();

  return (
    <div className="text-3xl text-slate-700 mx-auto w-[800px]" >
      {isProfileLoading && <p className="text-4xl text-blue-700 text-center">Đang tải...</p>}
      {!isProfileLoading && (
        <>
          <div className="mt-2">
            <p className="text-5xl py-4 text-center bg-blue-800 text-white font-semibold">Thanh toán</p>
            <p><span className="text-blue-800 font-semibold">Họ và tên:</span> {profile.name}</p>
            <p><span className="text-blue-800 font-semibold">Email:</span> {user.email}</p>
            <p><span className="text-blue-800 font-semibold">Số điện thoại:</span> {profile.phone_number}</p>
          </div>
          <div className="mt-4">
            <p className="text-center py-4 bg-blue-800 text-white font-semibold text-4xl">Ghế đã chọn</p>
            { selectedSingleSeats.length > 0 && (
              <div className="flex items-baseline space-x-2 mt-3">
                <p className="text-blue-800 font-semibold shrink-0">Ghế đơn:</p>
                <div className="flex flex-wrap space-x-2">
                  {selectedSingleSeats.map(s => (<div className="px-4 mt-2 py-2 rounded-lg bg-sky-700 text-white">{s}</div>))}
                </div>
              </div>
            )}
            {selectedDoubleSeats.length > 0 && (
              <div className="flex items-baseline space-x-2 mt-3">
                <p className="text-blue-800 font-semibold shrink-0">Ghế đôi:</p>
                <div className="flex flex-wrap space-x-2">
                  {selectedDoubleSeats.map(s => (<div className="px-4 mt-2 py-2 rounded-lg bg-indigo-700 text-white">{s}</div>))}
                </div>
              </div>
            )}
            <p className="mt-2 font-semibold text-red-700">Tổng tiền vé: {ticketTotalPrice} vnđ</p>
          </div>
          {selectedSnacks.length > 0 && (
            <>
              <div className="mt-4">
                <p className="text-center py-4 bg-blue-800 text-white font-semibold text-4xl">Đồ ăn đã chọn</p>
                  <table className='mt-4 w-full'>
                    <thead>
                      <tr>
                        {
                          ["Tên", "Số lượng", "Giá", "Tổng"].map((t, index) => (
                            <th key={index} className="text-center px-4 py-2 text-blue-800">{t}</th>
                          ))
                        }
                      </tr>
                    </thead>

                    <tbody>
                      {
                        selectedSnacks.map((snack, index) => (
                          <tr key={snack.id}>
                            <td className="py-2 text-slate-700 text-3xl text-center px-4">
                              <p className="text-center font-semibold text-blue-800">{snack.name}</p>
                            </td>
                            <td className="text-center font-semibold py-2 text-slate-700 text-3xl">
                              {snack.amount}
                            </td>
                            <td className="py-2 font-semibold text-red-700 text-3xl text-center">{snack.price} vnđ</td>
                            <td className="py-2 font-semibold text-red-700 text-3xl text-center">{snack.amount * snack.price} vnđ</td>
                          </tr>
                        ))
                      }
                    </tbody>

                  </table>
                <p className="mt-2 font-semibold text-red-700">Tổng tiền đồ ăn: {snacksTotalPrice} vnđ</p>
              </div>
            </>
          )}

          <div className="border-b-2 my-4 border-blue-800"/>
          <p className="mt-4 text-4xl font-bold text-red-700">Tổng cộng: {ticketTotalPrice + snacksTotalPrice} vnđ</p>
          <div className="flex items-end justify-between mt-4">
            <div>
                <Button onClick={() => onGoBack()}>
                  Quay lại
                </Button>
            </div>
            <button className="px-20 py-4 text-4xl font-semibold rounded-md text-white bg-green-700 hover:bg-green-800 disabled:bg-slate-700">
              Thanh toán
            </button>
          </div>
        </>
      )}
    </div>
  )
}