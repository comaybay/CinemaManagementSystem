import { useEffect, useState } from "react";
import supabase from "./supabase"

export default () => {
  const user = supabase.auth.user();
  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  useEffect(() => async () => {
    if (!user) {
      setIsProfileLoading(false);
    }
    else {
      setIsProfileLoading(true);
      const {data: profile} = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(profile);
      setIsProfileLoading(false);
    }
  }, [user])

  return {
    isProfileLoading,
    user,
    profile,
  }
}