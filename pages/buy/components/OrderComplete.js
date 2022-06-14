import Link from "next/link";
import Button from "../../components/Button";
import Image from 'next/image'

export default function OrderComplete({receiptCode}) {

  return <div className="flex flex-col items-center my-40">
    <h1 className="text-center text-6xl font-bold text-green-600">Mua vé thành công</h1>
    <h1 className="text-center text-4xl mt-2 text-green-600">Chúc bạn xem phim vui vẻ!</h1>
    <div className="mx-auto mt-10">
      <Image src="/order-complete.png" alt="Mua vé thành công" width="200" height="200" className="mx-auto object-cover" />
    </div>
    <div className="mt-8 p-4 w-fit border-2 border-red-600">
      <p className="text-4xl text-center font-semibold text-red-600">Mã biên lai: <span className="font-bold">{receiptCode}</span></p>
      <p className="mt-2 text-2xl text-center text-red-600">Khi vào rạp, hãy đưa mã này cho nhân viên xác nhận</p>
    </div>
    <div className="mx-auto mt-10">
      <Link href="/">
        <Button>Quay về trang chủ</Button>
      </Link>
    </div>
  </div>
}