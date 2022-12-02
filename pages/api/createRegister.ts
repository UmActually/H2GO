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
	const boiler = await axios.post("http://192.168.1.80/?temperature=true&boiler=true")
	/*
	idUsuario INT
	idEquipo INT
	tempTipo BOOL
	tempInicial INT
	tempMuestra INT
	tiempoEstimado INT
	feedback INT(1)
	*/
	const [query] = await pool.query("INSERT INTO registros (idUsuario,idEquipo, tempInicial,tempMuestra, tiempoEstimado) VALUES (?,?,?,?,?)", [req.body.idUsuario, req.body.idEquipo, req.body.tempInicial, req.body.tempMuestra, req.body.tiempoEstimado]);
	res.status(200).json(query);
}
