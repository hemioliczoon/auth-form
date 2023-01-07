import { ChangeEventHandler, useState } from "react"
import styles from "./InputField.module.scss"

type Props = {
  displayName: string,
  name: string,
  handleChange: ChangeEventHandler,
  value: string,
  pattern: string | undefined,
  type: string,
  errorMessage: string
}

function InputField(props: Props) {
  const [beenFocused, setBeenFocused] = useState(false)

  const handleBlur = () => {
    setBeenFocused(true)
  }

  const handleFocus = () => {
    if (props.name === "password") {
      setBeenFocused(true)
    }
  }

  return(
    <div className={styles.InputField}>
      <label>{props.displayName}</label>
      <input
        required
        className={beenFocused ? styles.beenFocused : ""}
        onChange={props.handleChange}
        onBlur={handleBlur}
        onFocus={handleFocus}
        value={props.value}
        pattern={props.pattern}
        type={props.type}
        name={props.name}
        id={props.name}
      />
      { beenFocused && <span>{props.errorMessage}</span> }
    </div>
  )
}

export default InputField
