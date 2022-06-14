import Link from 'next/link';
import { useMemo, useState } from 'react'
import Benefit from './components/Benefit';
import UserInformation from './components/UserInformation';
import supabase from '../../utils/supabase';
import useRedirectIfNotLoggedIn from '../../utils/useRedirectIfNotLoggedIn';
import useUserProfile from '../../utils/useUserProfile';
import UserReceipts from './components/UserReceipts';

export default function Membership() {
  const benefit = useMemo(() => <Benefit />, [])
  const userInformation = useMemo(() => <UserInformation />, [])
  const userReceipts = useMemo(() => <UserReceipts />, [])
  const [section, setSection] = useState(benefit);

  const {isProfileLoading, user} = useUserProfile();
  return (
    <div>
      {isProfileLoading && (<p className="text-4xl text-center my-20 text-blue-700">Đang tải...</p>)}
      { !isProfileLoading && 
        (<div className="content mt-8">
          <div className="tabMovie-line">
              <div className="tabMovie-line">
                <ul className="navMovie">
                  <li className="active">
                  <button onClick={() => setSection(benefit)} className={`hover:text-blue-500 ${section === benefit ? "text-blue-500" : ""}`}>
                      Quyền lợi
                    </button>
                  </li>
                {user && ( 
                  <>
                    <li >
                    <button onClick={() => setSection(userInformation)} className={`hover:text-blue-500 ${section === userInformation ? "text-blue-500" : ""}`}>
                        Thành viên
                      </button>
                    </li>
                    <li >
                      <button onClick={() => setSection(userReceipts)} className={`hover:text-blue-500 ${section === userReceipts ? "text-blue-500" : ""}`}>
                        Lịch sử mua vé      
                      </button>
                    </li>
                  </>
                    )
                  }
                {!user && (
                    <li >
                      <Link href="./sign-up">
                        <button className="hover:text-blue-500">
                          Đăng ký
                        </button>
                      </Link>
                  </li>
                  )}
                </ul>
              </div>
          </div>
          {section}
        </div>)
      }
    </div>)
}
