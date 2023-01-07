export type User = {
  name: string,
  email: string,
  password: string,
  yearly: boolean,

  // doing it in relational database-like format since this is what it would
  // look like if there was an actual database 
  planId: number
}
