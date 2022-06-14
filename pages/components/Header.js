import { useState } from "react";
import { useRouter } from 'next/router';
import useUserProfile from "../../utils/useUserProfile";
import supabase from "../../utils/supabase";
import Link from "next/link";

export default function Header() {
  const { isProfileLoading, profile } = useUserProfile();
  const router = useRouter();

  const signOut = async () => {
    await router.push("/");
    await supabase.auth.signOut();
  }

  return (
    <>
      <div className="header flex justify-between mx-32">
        <img id="logoHeader" src="/img/galaxyS-logo.png" alt="logo" />
        {!profile ?
          !isProfileLoading &&
          <Link href="/sign-in" >
            <ul className="flex space-x-2">
              <li > <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg></li>
              <li><a href="#" className="text-3xl" >
                Đăng nhập
              </a></li>
            </ul>
          </Link>
          :
          <ul className="flex space-x-2 items-center">
            <li className="text-blue-800"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg></li>
            <li><p href="#" className="text-3xl text-blue-800" >
              {profile.name}
            </p></li>
            {
              profile.is_admin && <p className="text-red-700 text-xl">(Admin)</p>
            }
            <button className="ml-4 text-3xl hover:text-blue-700" onClick={signOut}>đăng xuất</button>
          </ul>
        }
      </div>
      <div className="sideBar bg-blue-900">
        <ul id="nav">
          <li><Link href="/">MUA VÉ</Link></li>
          {/* <li><Link href="/">PHIM</Link></li> */}
          <li><Link href="/membership">THÀNH VIÊN</Link></li>
          <li><Link href="/support">HỖ TRỢ</Link></li>
          {
            profile && profile.is_admin && (
              <li><Link href="/admin">ADMIN</Link></li>
            )
          }
        </ul>
      </div>
    </>
  )
}

