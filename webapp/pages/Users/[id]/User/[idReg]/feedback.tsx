import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'



function feedback() {
	const buttonstyle = "m-2 px-2 py-4 rounded-md ";
	const Router = useRouter()
	const addFeedback = async (feedback: number) => {
		console.log(Router.query);
		const idReg = Router.query.idReg;

		const Feedback = await axios.post("/api/addFeedback", { "idReg": idReg, "feedback": feedback });
		Router.push(`/Users/${Router.query.id}/User`)

	}
	return (
		<div className="w-screen h-screen bg-blue-300 flex  flex-col justify-center items-center">
			<h1 className="text-4xl">
				¿Te gustó tu baño?
			</h1>
			<br>
			</br>

			<br>
			</br>

			<br>
			</br>

			<br>
			</br>
			<div>
				<button onClick={() => addFeedback(2)} className={buttonstyle + "bg-orange-300"}>
					Estuvo muy caliente
				</button>

				<button onClick={() => addFeedback(1)} className={buttonstyle + "bg-white"}>
					Estuvo perfecto
				</button>

				<button onClick={() => addFeedback(0)} className={buttonstyle + "bg-blue-200"}>
					Estuvo muy frío
				</button>

			</div>
		</div>
	)
}
export default feedback;
