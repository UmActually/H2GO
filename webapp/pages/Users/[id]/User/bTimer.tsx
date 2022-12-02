import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from "axios"
import { useEffect, useState } from "react"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useRouter } from 'next/router'

/**
 * @brief recibe los parámetros del registro necesarios para desplegar el temporizador
 * y los 
 */
export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
	const requests = await axios.post("http://localhost:3000/api/GetEstimateTime") // nimodo toco ponerlo hardcodeado
	const user = await axios.post("http://localhost:3000/api/getUserById", context.query) // nimodo toco ponerlo hardcodeado
	return {
		props: {
			tiempoEstimado: requests.data.time,
			tempInicial: requests.data.req1.temperature,
			tempMuestra: requests.data.req2.temperature,
			idUsuario: user.data[0].id,
			idEquipo: user.data[0].idEquipo
		}, // will be passed to the page component as props
	}
}

function leadingZero(time: number): string {
	if (time < 10) {
		return "0" + time.toString();
	}
	return time.toString();
}

function bTimer(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [buttonStyle, setButtonStyle] = useState<string>("hidden");
	const router = useRouter();
	async function stopBoiler() {
		const result = await axios.post("/api/createRegister", props);
		console.log(result.data.insertId);
		router.push(`/Users/${props.idUsuario}/User/${result.data.insertId}/feedback`);

	}

	return (
		<div className='bg-blue-300 w-screen h-screen flex justify-center items-center'>
			{props.user}
			<div className='bg-white w-96 h-96 flex flex-col justify-evenly text-2xl items-center'>
				<h1>H2GO está calentando el agua...</h1>
				<p>Por favor espere</p>
				<CountdownCircleTimer
					isPlaying
					duration={props.tiempoEstimado}
					colors={['#004777', '#F7B801', '#A30000', '#A30000']}
					colorsTime={[7, 5, 2, 0]}
				>
					{({ remainingTime }) => {
						if (remainingTime == 0) {
							setButtonStyle("bg-blue-300 p-2 rounded-md")

						}
						return Math.floor(remainingTime / 60) + ":" + leadingZero(remainingTime % 60);
					}}
				</CountdownCircleTimer>
				<button className={buttonStyle} onClick={() => stopBoiler()}>Apagar boiler</button>
			</div>
		</div>
	)
}

export default bTimer;
