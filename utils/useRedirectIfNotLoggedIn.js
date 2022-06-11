import { useRouter } from "next/router"
import supabase from "./supabase"

export default function useRedirectIfNotLoggedIn() {
  const router = useRouter();

  if (typeof window === 'undefined') {
    return;
  }

  if (!supabase.auth.user()) {
    router.replace('/sign-in');
  }
}