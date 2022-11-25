
import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from './../../config/db'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method == "POST") {
		const [usuarios]: any[] = await pool.query(`select * from Usuarios where nombre =? and contra = ?`, [req.body.name, req.body.password]);
		if (usuarios.length == 0) {
			res.json(undefined);
		}
		else {
			res.json(usuarios[0]);
		}

	}
}
