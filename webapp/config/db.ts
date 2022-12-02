import { createPool } from 'mysql2/promise'

const pool = createPool({
	host: "us-cdbr-east-06.cleardb.net",
	user: "bd670e0228877e",
	password: "f343723d",
	database: "heroku_fd12f7f7304c66a",
	port: 3306
})

export { pool };
