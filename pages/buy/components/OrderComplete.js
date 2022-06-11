import Link from "next/link";
import Button from "../../components/Button";
import Image from 'next/image'

export default function OrderComplete() {
  return <div className="flex justify-center flex-col my-40">
    <h1 className="text-center text-6xl font-bold text-green-600">Mua vé thành công</h1>
    <h1 className="text-center text-4xl mt-2 text-green-600">Chúc bạn xem phim vui vẻ!</h1>
    <div className="mx-auto mt-10">
      <Image src="/order-complete.png" alt="Mua vé thành công" width="200" height="200" className="mx-auto object-cover" />
    </div>
    <div className="mx-auto mt-20">
      <Link href="/">
        <Button>Quay về trang chủ</Button>
      </Link>
    </div>
  </div>
}