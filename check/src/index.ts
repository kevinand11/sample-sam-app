import middy, { MiddlewareObj } from "@middy/core"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { logger } from './logger'
import { mockOrdersCreation } from './orders'

const middleware: MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> = {
	before: (request) => {
		const requestId = request.event?.requestContext?.requestId ?? Math.random().toString()
		logger.with({ requestId })
	}
}

export const checkHeader = middy(async (event: APIGatewayProxyEvent) => {
	const header = event.headers['X-Client-Id']
	const headerPresent = header !== undefined

	await mockOrdersCreation()

	return {
		statusCode: 200,
		body: JSON.stringify({
			headerPresent,
			event
		}),
	}
})
	.use(middleware)
