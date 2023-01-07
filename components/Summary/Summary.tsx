import { MouseEvent, Dispatch, SetStateAction, use } from "react"
import { Plan } from "../../backend/src/types/Plan"
import { User } from "../../backend/src/types/User"

import styles from "./Summary.module.scss"

type Props = {
  plans: Plan[],
  userInput: User,
  setCurrentForm: Dispatch<SetStateAction<number>>
}

function Summary({ plans, userInput, setCurrentForm }: Props) {
  let planPrice
  if (!userInput.yearly) {
    planPrice = "$" + plans[userInput.planId]?.priceMonth + "/mo"
  } else {
    const discount = plans[userInput.planId]?.discountYear
    planPrice = "$" + plans[userInput.planId]?.priceMonth * 12 * (100 - discount) / 100 + "/yr"
  }

  const handleFormNavigate = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget as HTMLButtonElement
    setCurrentForm(Number(target.value))
  }

  return(
    <div className={styles.Summary}>
      <div>
        <h2>summary</h2>
        <p>check if everything is the way you want</p>
      </div>
      <div className={styles.userInput}>
        <section className={styles.userInfo}>
          <div>
            <h4>credentials</h4>
            <p>name: {userInput.name ? userInput.name : "you forgot name"}</p>
            <p>email: {userInput.email ? userInput.email : "you forgot email"}</p>

            { /* TODO: check icon next to a password */ }
            <p>password: {userInput.password ? "check" : "you forgot that"}</p>
          </div>

          <button onClick={handleFormNavigate} value={0}>change</button>
        </section>

        <section className={styles.planInfo}>
          <div>
            <h4>{plans[userInput.planId]?.name}</h4>
            <p>{plans[userInput.planId]?.disc}</p>
            <p>{planPrice}</p>
          </div>
          <button onClick={handleFormNavigate} value={1}>change</button>
        </section>
      </div>
    </div>
  )
}

export default Summary
