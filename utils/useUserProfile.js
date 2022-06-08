import { useEffect, useState } from "react";
import supabase from "./supabase"

export default () => {
  const [user, setUser] = useState(supabase.auth.user());
  const [profile, setProfile] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  
  useEffect(() => {
    setUser(supabase.auth.session()?.user ?? null);

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setIsProfileLoading(true);
    });

    return () => listener.unsubscribe();
  }, []);

  useEffect(() => { 
    (async () => {
      if (!user) {
        setProfile(null);
        setIsProfileLoading(false);
        return;
      }

      setIsProfileLoading(true);
      const {data: profile} = await supabase.from("profiles").select("*").eq("id", user.id).single();
      setProfile(profile);
      setIsProfileLoading(false);
    })();
  }, [user]);

  return {
    isProfileLoading,
    user,
    profile,
  }
}