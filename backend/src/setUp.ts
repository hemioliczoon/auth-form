import { addPlan } from "./controllers/plan"
import { addUser } from "./controllers/user"
import { db } from "./db"
import { Plan } from "./types/Plan"

export const admin = {
  name: "admin",
  email: "admin@ad.min",
  password: "password",
  yearly: true,
  planId: 0,
} 

export const setUp = () => {
  db.addTable("users")
  db.addTable("plans")

  addUser(admin)

  const defaultPlans: Plan[] = [
    {
      id: 0,
      name: "default",
      priceMonth: 10,
      discountYear: 10,
      disc: "default plan"
    },
    {
      id: 1,
      name: "advanced",
      priceMonth: 20,
      discountYear: 15,
      disc: "advanced plan"
    },
    {
      id: 2,
      name: "pro",
      priceMonth: 50,
      discountYear: 15,
      disc: "pro plan"
    },
  ]

  for (let ii = 0; ii < defaultPlans.length; ii++) {
    // addPlan(defaultPlans[ii])
    db.addToTable("plans", defaultPlans[ii])
  }
}

