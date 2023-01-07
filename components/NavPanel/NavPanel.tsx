import { ChangeEvent, Dispatch, SetStateAction } from "react"
import style from "./NavPanel.module.scss"

type Props = {
  forms: any[],
  currentForm: number,
  setCurrentForm: Dispatch<SetStateAction<number>>
}

function NavPanel({ forms, currentForm, setCurrentForm}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget as HTMLInputElement
    setCurrentForm(Number(target.value))
  }
  return(
    <div className={style.NavPanel}>
       {forms.map((form, index) => {
        return(
          /* it is fine to use index as key here since forms are not going to be rearranged */
          <label key={index} htmlFor={form.name} >
            <input 
              type="radio"
              onChange={handleChange}
              checked={forms[currentForm]?.name === form.name}
              id={form.name}
              name="form"
              value={index}
            />
            <p>{form.name}</p>
            <div className={style.circle} />
            <div className={style.background} />
          </label>
        )
      })}
    </div>
  )
}

export default NavPanel
