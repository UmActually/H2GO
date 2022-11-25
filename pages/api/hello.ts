// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from './../../config/db'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	const [equipo] = await pool.query("SELECT * FROM Equipos")
	console.log(equipo);
	return res.status(200).json(equipo);
}
