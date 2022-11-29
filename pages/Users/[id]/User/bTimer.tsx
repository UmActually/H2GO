import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import axios from "axios"
import { useEffect, useState } from "react"
import { request } from 'http'
export const getServerSideProps: GetServerSideProps<any> = async (context: any) => {
	const requests = await axios.post("http://localhost:3000/api/GetEstimateTime") // nimodo toco ponerlo hardcodeado
	return {
		props: {
			requests: requests.data
		}, // will be passed to the page component as props
	}
}
function bTimer(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<div>
		</div >
	)

}

export default bTimer;
