import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from "axios"
import { useEffect, useState } from "react"
export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
	const request = axios.get("http://10.22.245.88") // nimodo toco ponerlo hardcodeado

	return {
		props: {
		}, // will be passed to the page component as props
	}
}
function bTimer(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const [loadingstyle, setLoadingstyle] = useState<string>("bg-black w-screen h-screen flex flex-row justify-center items-center")
	useEffect(
		() => {
			setLoadingstyle("hidden");

		}
		, [props]
	)
	return (
		<div>
			<div className={loadingstyle} >
				<img className="w-96 h-96 " src="https://media.giphy.com/media/17mNCcKU1mJlrbXodo/giphy.gif" alt="funny GIF" width="100%"></img>
			</div>

		</div >
	)

}

export default bTimer;
