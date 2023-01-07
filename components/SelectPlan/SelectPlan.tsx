import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { Plan } from "../../backend/src/types/Plan"
import { User } from "../../backend/src/types/User"

import styles from "./SelectPlan.module.scss"

type Props = {
  plans: Plan[],
  selectedPlan: number,
  yearly: boolean,
  setUserInput: Dispatch<SetStateAction<User>>,
}

function SelectPlan({ plans, selectedPlan, yearly, setUserInput }: Props) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    setUserInput(prev => ({ ...prev, planId: Number(target.value) }))
  }

  const handleYearly = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    setUserInput(prev => ({ ...prev, yearly: target.checked }))
  }

  return(
    <form className={styles.SelectPlan}>
      <h2>select your plan</h2>
      <p>you can chosose to pain monthly or yearly</p>
      <div className={styles.plans}>
        { plans.map((plan) => {
          let planPrice: string
          if (!yearly) {
            planPrice = "$" + plan.priceMonth + "/mo"
          } else {
            const discount = plan.discountYear
            planPrice = "$" + plan.priceMonth * 12 * (100 - discount) / 100 + "/yr"
          }
          return( 
            <label key={plan.id} htmlFor={plan.name} >
              <input 
                type="radio"
                onChange={handleChange}
                checked={selectedPlan === plan.id}
                value={plan.id}
                id={plan.name}
                name="plan"
              />

              <div>
                <h4>{plan.name}</h4>
                <p>{plan.disc}</p>
                <p>{planPrice}</p>
              </div>
            </label>
          )
        })}
      </div>

      <label htmlFor="yearly" className={styles.switch}> 
        <h4 className={!yearly ? styles.yearlySelected : ""}>monthly</h4>
        <input onChange={handleYearly} defaultChecked={yearly} type="checkbox" id="yearly" name="yearly" />
        <h4 className={yearly ? styles.yearlySelected : ""}>yearly</h4>

        <div></div>
      </label>

    </form>
  )
}

export default SelectPlan
