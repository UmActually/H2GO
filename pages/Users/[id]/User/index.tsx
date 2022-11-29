import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'

type User = {
	id: number,
	nombre: string,
	tempPref: string,
	idEquipo: number,
	contra: string,
	isAdmin: boolean
}

export const getServerSideProps: GetServerSideProps<{ user: User }> = async (context: any) => {
	const user = await axios.post("http://localhost:3000/api/getUserById", context.query);

	return {
		props: {
			user: user.data[0],
		}, // will be passed to the page component as props
	}
}


function Users(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();

	const [loadingstyle, setLoadingstyle] = useState<string>("hidden bg-black w-screen h-screen flex flex-row justify-center items-center")

	const handleSubmit: () => void = () => {
		setLoadingstyle("bg-black w-screen h-screen flex flex-row justify-center items-center");
		router.push(`/Users/${props.user.id}/User/bTimer`);
	}


	return (
		<div>
			<div className={loadingstyle} >
				<img className="w-96 h-96 " src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif" alt="funny GIF" width="100%"></img>
			</div>
			<div className='bg-blue-300 w-screen h-screen flex flex-col justify-start space-y-44 py-5 items-center '>
				<h1 className='text-3xl'>hello {props.user.nombre}</h1>
				<button className='h-40 bg-white flex justify-center items-center w-52 text-2xl rounded-md' onClick={() => handleSubmit()}>
					prender boiler
				</button>

			</div>
		</div>
	)

}
export default Users;
