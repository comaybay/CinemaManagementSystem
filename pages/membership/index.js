import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useMemo, useState } from 'react'
import NowAiring from '../components/NowAiring';
import ComingSoon from '../components/ComingSoon';
import Benefit from './components/benefit';
import UserInformation from './components/userInformation';
import { useRouter } from 'next/router';

export default function Membership() {
  const benefit = useMemo(() => <Benefit />, [])
  const userInformation = useMemo(() => <UserInformation />, [])
  const [section, setSection] = useState(benefit);

  return (
    <>
      <div className="content mt-8">
        <div className="tabMovie-line">
            <div className="tabMovie-line">
              <ul className="navMovie">
                <li className="active">
                <button onClick={() => setSection(benefit)} className={`hover:text-blue-500 ${section === benefit ? "text-blue-500" : ""}`}>
                    Quyền lợi
                  </button>
                </li>
                <li >
                <button onClick={() => setSection(userInformation)} className={`hover:text-blue-500 ${section === userInformation ? "text-blue-500" : ""}`}>
                    Thành viên
                  </button>
                </li>
                <li >
                  <Link href="./sign-up">
                    <button className="hover:text-blue-500">
                      Đăng ký
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
        </div>
        {section}
      </div>
    </>
  )
}
