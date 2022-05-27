import { useState } from "react";
import useQuery from "../../utils/useQuery";
import useUserProfile from "../../utils/useUserProfile";
import CinemaSection from "./components/CinemaSection";


export default function Admin() {
  const { isProfileLoading, profile } = useUserProfile();
  const isAdmin = !isProfileLoading && (!profile || !profile.is_admin);

  const [{result: cinemas}] = useQuery(supabase => (supabase.from("cinemas").select(`id, name`)));


  return (
    <div className="flex flex-col items-center space-y-10 text-3xl w-full my-10">
      {isAdmin ? (
        <h1 className="text-6xl font-bold text-red-700 self-center justify-self-center">Bạn không có quyền xem trang này</h1>
      ) : (
        cinemas && cinemas.map(c => (<CinemaSection key={c.id} cinema={c}/>))
      )}
    </div>
  )
}