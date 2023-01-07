import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { axiosConn } from "../axios"
import { Plan } from "../backend/src/types/Plan"

function Main(props: {plans: Plan[]}) {
  const [logged, setLogged] = useState(false)
  const plan = useRef<undefined | Plan>(undefined)

  const router = useRouter()

  useEffect(() => {
    let user
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user") || "{}")
      if (user.name) setLogged(true)

      plan.current = props.plans[Number(user.planId)]

    }
  }, [])


  // refresh the page after imperative navigation to "/" 
  useEffect(() => {
    const handleRouteChange = () => {
      if (router.pathname === "/") {
        router.reload()
      }
    }

    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [])

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user") 
    }
    axiosConn.post("/auth/logout")
    setLogged(false)
    plan.current = undefined
  }

  if (logged) {
    return( 
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p>{plan.current?.name}</p>
        <p>{plan.current?.priceMonth}</p>
        <p>{plan.current?.disc}</p>
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }

  return( 
    <>
      <Link href="/login">login</Link>
      <br/>
      <Link href="/register">register</Link>
    </>
  )
}

export async function getStaticProps() {
  let plans
  const req = await axiosConn.get("/plans")
  plans = req.data
  return {
    props: {
      plans,
    }
  }
}

export default Main
