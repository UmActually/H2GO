import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from './../../config/db'
import axios from 'axios'

/**
 * @brief recibe una POST request para subir un registro a la tabla
 * 'registros' en la base de datos. Se necesita en el cuerpo de la
 * request el ID del usuario y del equipo.
 */
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	await pool.query(`UPDATE registros  SET feedback = ? WHERE id = ?;`, [req.body.feedback, req.body.idReg])

	res.status(200).json("hola");
}
