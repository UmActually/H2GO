import axios from 'axios'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'

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
	return (
		<div className='bg-blue-300 w-screen h-screen flex flex-col justify-start space-y-44 py-5 items-center '>
			<h1 className='text-3xl'>hello {props.user.nombre}</h1>
			<button className='h-40 bg-white flex justify-center items-center w-52 text-2xl rounded-md' onClick={() => alert("boiler prendido")}>
				prender boiler
			</button>

		</div>
	)

}
export default Users;
