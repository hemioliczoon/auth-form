import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { User } from "../../backend/src/types/User"
import InputField from "../InputField/InputField"

import styles from "./UserInfo.module.scss"

type Props = {
  userInput: User,
  setUserInput: Dispatch<SetStateAction<User>>
}

function UserInfo({ userInput, setUserInput }: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    setUserInput(prev => ({ ...prev, [target.name]: target.value }))
  }

  const inputFields = [
    {
      displayName: "username",
      name: "name",
      handleChange,
      value: userInput.name,
      pattern: "[A-Za-z1-9]{3,}$",
      type: "text",
      errorMessage: "username is required and should have at least 3 alphanumeric characters",
    },
    {
      displayName: "email",
      name: "email",
      handleChange,
      value: userInput.email,
      pattern: undefined,
      type: "email",
      errorMessage: "invalid email",
    },
    {
      displayName: "password",
      name: "password",
      handleChange,
      value: userInput.password,
      pattern: `^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{14,}$`,
      type: "password",
      errorMessage: "password should have at least 14 characters and have at least 1 lowercase letter, 1 uppercase letter and 1 number",
    },
  ]


// TODO: probably should have made an input component
  return(
      <form className={styles.UserInfo}>
        <div>
          <h2>login credentials</h2>
          <p>you will use this to login into your account</p>
        </div>
        {
          inputFields.map((field, index) => {
          // it is fine to use index here since the input fields are not going to be rearranged
            return( <InputField key={index} {...field} />)
          })
        }
      </form>
  )
}

export default UserInfo
