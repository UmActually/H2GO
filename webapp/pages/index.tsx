import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

type userType = {
	name: string,
	password: string,
}

export default function Home() {
	const [user, setUser] = useState<userType>({
		name: "",
		password: "",
	})
	const handleChange = (e: any) => {
		setUser(user => ({ ...user, [e.target.name]: e.target.value }))

	}
	const router = useRouter();
	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const result = await axios.post("/api/verifyUser", user);
		const data = result.data;
		if (!data) {
			alert("error: usuario o contraseña incorrecta")
		}
		else if (!data.esAdmin) {
			router.push(`/Users/${data.id}/User`);
		}
		else {
			router.push(`/Admin/${data.id}/Admin`)
		}
	}
	return (
		<div className='flex w-screen h-screen flex-col items-center justify-center bg-blue-300'>
			<h1 className='text-3xl'>login</h1>
			<br />
			<div className='w-2/3 max-w-2xl min-w-[300px] h-96 bg-white rounded-md'>
				<form className='flex flex-col h-full w-full justify-evenly items-center' onSubmit={e => handleSubmit(e)}>
					<input placeholder="name" className='bg-gray-100 w-2/3 p-3 text-md rounded-md' onChange={e => handleChange(e)} name='name' />
					<input placeholder="password" onChange={e => handleChange(e)} className='bg-gray-100 w-2/3 p-3 text-md rounded-md' type="password" name='password' />
					<button type='submit' className='bg-gray-300 hover:bg-gray-500 p-3 rounded-md' >Iniciar Sesion</button>
				</form>

			</div>


		</div>
	)
}
