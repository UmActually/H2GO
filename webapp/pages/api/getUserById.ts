import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from './../../config/db'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method == "POST") {
		const [query] = await pool.query("select * from Usuarios where id=?", [req.body.id])
		res.status(200).json(query)

	}
}
