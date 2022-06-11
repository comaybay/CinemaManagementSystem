import Link from 'next/link';
import { useMemo, useState } from 'react'
import Benefit from './components/benefit';
import UserInformation from './components/userInformation';
import supabase from '../../utils/supabase';
import useRedirectIfNotLoggedIn from '../../utils/useRedirectIfNotLoggedIn';
import useUserProfile from '../../utils/useUserProfile';

export default function Membership() {
  const benefit = useMemo(() => <Benefit />, [])
  const userInformation = useMemo(() => <UserInformation />, [])
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
                    <li >
                    <button onClick={() => setSection(userInformation)} className={`hover:text-blue-500 ${section === userInformation ? "text-blue-500" : ""}`}>
                        Thành viên
                      </button>
                    </li>
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
