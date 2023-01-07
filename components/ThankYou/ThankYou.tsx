import Link from "next/link"
import styles from "./ThankYou.module.scss"

type Props = {
}

function ThankYou({}: Props) {
  return(
    <div className={styles.Summary}>
      <p>You cool purchase will be delevired soon</p>
      <Link href="/">to home page</Link>
    </div>
  )
}

export default ThankYou
