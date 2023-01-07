import { useState, MouseEvent } from "react"
import Link from "next/link"

import { User } from "../backend/src/types/User"
import { Plan } from "../backend/src/types/Plan"

import SelectPlan from "../components/SelectPlan/SelectPlan"
import UserInfo from "../components/UserInfo/UserInfo"
import Summary from "../components/Summary/Summary"
import ThankYou from "../components/ThankYou/ThankYou"
import NavPanel from "../components/NavPanel/NavPanel"

import { axiosConn } from "../axios"
import { login } from "./login"

import styles from "./Register.module.scss"

type Props = {
  plans: Plan[]
}

function Register({ plans }: Props) {
  const [currentForm, setCurrentForm] = useState(0)
  const [userInput, setUserInput] = useState<User>({
    name: "",
    email: "",
    password: "",
    yearly: false,
    planId: 0 
  })
  const [isRegistered, setIsRegistered] = useState<boolean>(false)

  const [error, setError] = useState<unknown>(null)

  const forms = [
    {name: "User Info", form: UserInfo({ userInput, setUserInput })},
    {name: "Select Plan", form: SelectPlan({ plans, selectedPlan: userInput.planId, yearly: userInput.yearly, setUserInput})},
    {name: "Summary", form: Summary({ plans, userInput, setCurrentForm })},
  ]


  const handleFormChange = async (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement
    let amount = target.name === "back" ? -1 : 1
    amount = amount === -1 && currentForm === 0 ? 0 : amount
    // amount = amount === 1 && currentForm === forms.length - 2 ? 0 : amount

    // TODO: don't really like what i'm doing here
    if (currentForm === forms.length - 1 && amount === 1) {
        // check input 
      if (userInput.name && userInput.email && userInput.password) {
        let user: User
        try {
          await axiosConn.post("/auth/register", userInput)
          login({ name: userInput.name, password: userInput.password }, setError)
        } catch (err) {
          setError(err)
          console.error(err)
          return
        }
        setIsRegistered(true)
      }
      amount = 0
    }
    return setCurrentForm((prev) => prev + amount)
  }

  return( 
    <div className={styles.Register}>
      {
        !isRegistered 
        ? <div className={styles.wrapper}>
          <NavPanel forms={forms} currentForm={currentForm} setCurrentForm={setCurrentForm}/>
          { forms[currentForm]?.form }

          <div className={styles.navButtons}>
            <button onClick={handleFormChange} name="back">Back</button>
            <button onClick={handleFormChange} name="forward">Next step</button>
          </div> 
        </div> 
        : <ThankYou />
      }
    </div>
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

export default Register

