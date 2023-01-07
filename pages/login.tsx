import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { axiosConn } from "../axios"
import { LoginData } from "../backend/src/types/LoginData"
import styles from "./Login.module.scss"

// TODO: don't really like what i'm doing here
export const login = async (loginData: LoginData, setError: Dispatch<SetStateAction<unknown>> ) => {
  try {
    const res = await axiosConn.post(
      "/auth/login",
      loginData,
      // MEMO: cookie will not be set if `withCredentials: false`
      { withCredentials: true }
    )
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(res.data))
    }
  } catch (err) {
    setError(err)
  }
}

function Login() {
  const [loginData, setLoginData] = useState<LoginData>({
    name: "",
    password: "",
  })

  const [error, setError] = useState<unknown>(null)

  const router = useRouter()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    setLoginData(prev => ({ ...prev, [target.name]: target.value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    // TODO: put user data in the context
    if (loginData.name && loginData.password) {
      login(loginData, setError)
      router.push("/")
    }
  }
  
  return( 
    <div className={styles.Login}>
      <form onSubmit={handleSubmit}>
        <label>
          <h4>username:</h4>
          <input onChange={handleChange} type="text" name="name" id="name"/>
        </label>
        <label>
          <h4>password:</h4>
          <input onChange={handleChange} type="password" name="password" id="password"/>
        </label>
        <Link href="/register">I don't have an account</Link>
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login
