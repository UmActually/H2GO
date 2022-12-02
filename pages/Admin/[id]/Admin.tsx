import axios from 'axios';
import { useRouter } from 'next/router'
import { useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
type User = {
	id: number,
	nombre: string,
	tempPref: string,
	idEquipo: number,
	contra: string,
	isAdmin: boolean
}
type Registro = {
	id: number,
	idUsuario: number,
	idEquipo: number,
	tempInicial: number,
	tempMuestra: number,
	tiempo: Date,
	tiempoEstimado: number,
	feedback: number,

}
export const getServerSideProps: GetServerSideProps<{ user: User, registros: Registro[] }> = async (context: any) => {
	const user = await axios.post("http://localhost:3000/api/getUserById", context.query);
	const registros = await axios.get("http://localhost:3000/api/getRequests");


	return {
		props: {
			user: user.data[0],
			registros: registros.data
		}, // will be passed to the page component as props
	}
}
function Admin(props: InferGetServerSidePropsType<typeof getServerSideProps>) {


	return (
		<div className='bg-blue-300 w-screen h-screen flex flex-col justify-start items-center pt-5'>
			<h1 className='text-3xl'>
				buenos dias {props.user.nombre}
			</h1>
			<div className="w-screen p-5 h-full flex-wrap flex justify-start space-x-5 spacey-10 items-start">

				{
					props.registros.map((registro: Registro) => (
						<div className='bg-white py-5 px-2 rounded-md w-auto h-auto '>
							<div>
								<h1 className='text-xl  font-bold mb-4'>{registro.tiempo.toString()}</h1>
								<ul className='space-y-2'>
									<li>
										<b>id:</b> {registro.id}
									</li>
									<li>
										<b>Id del Usuario:</b> {registro.idUsuario}
									</li>
									<li>
										<b>Id del Equipo:</b> {registro.idEquipo}
									</li>
									<li>
										<b>Temperatura sin el boiler prendido:</b> {registro.tempInicial}
									</li>
									<li>
										<b>Temperatura despues de 5 segundos:</b> {registro.tempMuestra}
									</li>
									<li>
										<b>fecha:</b> {registro.tiempo.toString()}
									</li>
									<li>
										<b>tiempoEstimado:</b> {registro.tiempoEstimado}
									</li>
									<li>
										<b>feedback:</b> {registro.feedback}
									</li>
								</ul>
							</div>

						</div>
					))
				}
			</div>
		</div >
	)
}
export default Admin;
