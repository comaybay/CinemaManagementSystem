import { useRouter } from "next/router";
import { useState } from "react"
import supabase from "../utils/supabase.js"

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const signIn = async () => {
    setLoading(true);
    let { user, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setErrorMsg(error.message)
    }

    else {
      setLoading(false);
      router.replace('/');
    }
  }

  return (
    <>
      {
        loading ?
          <p>Loading...</p> 
          :
          <div className="flex flex-col items-center w-96 bg-gray-100 space-y-2">
            <div className="text-red-500">{errorMsg}</div>
            <label>
              Email:
              <input type="text" value={email} onChange={e => setEmail(e.target.value)}></input>
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}></input>
            </label>
            <button className="bg-blue-200 border-gray-500" onClick={signIn}>SignIn</button>
          </div>
      }
    </>
  )
}
