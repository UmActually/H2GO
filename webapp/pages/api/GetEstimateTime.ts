
import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from './../../config/db'
import axios from 'axios'

type Requests = {
	req1: any,
	req2: any,
	time: number,
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method == "POST") {

		let requests: Requests = {
			req1: {},
			req2: {},
			time: 0,
		}
		requests.req1 = await axios.post("http://192.168.1.80/?temperature=true&boiler=true") // nimodo toco ponerlo hadcodeado
		requests.req1 = requests.req1.data;

		setTimeout(
			async () => {

				requests.req2 = await axios.post("http://192.168.1.80/?temperature=true&boiler=false") // nimodo toco ponerlo hadcodeado
				requests.req2 = requests.req2.data;

				// calculo del tiempo ideal

				let m = (requests.req2.temperature - requests.req1.temperature) / 20
				let time = (y: number): number => { return ((y - requests.req1.temperature) / m) };
				requests.time = time(36) < 0 || time(36) == Infinity ? 60 : time(36);
				console.log(requests)

				res.status(200).json(requests)
			}
			, 15000
		)


	}
}
