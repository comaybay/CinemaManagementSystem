import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useMemo, useState } from 'react'
import NowAiring from '../components/NowAiring';
import ComingSoon from '../components/ComingSoon';
import Benefit from './components/benefit';
import UserInformation from './components/userInformation';

export default function Membership() {
  const benefit = useMemo(() => <Benefit />, [])
  const userInformation = useMemo(() => <UserInformation />, [])
  const [section, setSection] = useState(benefit);


  return (
    <>
      <div className="content mt-8">
        <div className="tabMovie-line">
          <ul className="flex border-2 border-blue-700 text-blue-700">
            <button onClick={() => setSection(benefit)} className={`grow py-2 text-4xl border-r border-blue-700 ${section === benefit ? "bg-blue-700 text-white": ""}`}>
              Quyền lợi
            </button>
            <button onClick={() => setSection(userInformation)} className={`grow py-2 text-4xl border-l border-blue-700 ${section === userInformation ? "bg-blue-700 text-white" : ""}`}>
              Thông tin tài khoản
            </button>
          </ul>
        </div>
        {section}
      </div>
    </>
  )
}
