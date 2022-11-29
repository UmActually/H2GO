
import type { NextApiRequest, NextApiResponse } from 'next'
import { pool } from './../../config/db'
import axios from 'axios'

type Requests = {
	req1: any,
	req2: any,
}
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>
) {
	if (req.method == "POST") {
		let requests: Requests = {
			req1: {},
			req2: {}
		}
		requests.req1 = await axios.post("http://10.22.245.88/?temperature=true&boiler=true") // nimodo toco ponerlo hadcodeado
		requests.req1 = requests.req1.data;

		setTimeout(
			async () => {
				requests.req2 = await axios.post("http://10.22.245.88/?temperature=true&boiler=false") // nimodo toco ponerlo hadcodeado
				requests.req2 = requests.req2.data;
				console.log(requests)
				res.status(200).json(requests);
			}
			, 20000
		)


	}
}
