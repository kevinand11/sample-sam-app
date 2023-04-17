import middy, { MiddlewareObj } from "@middy/core"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { Logger } from './src/logger'
import { mockOrdersCreation } from './src/orders'

type Event = APIGatewayProxyEvent & { logger: Logger }

const middleware: MiddlewareObj<Event, APIGatewayProxyResult> = {
  before: async (request) => {
    if (!request.event.logger) request.event.logger = Logger.get()
  },
}

export const checkHeader = middy(async (event: Event) => {
  const requestId = event?.requestContext?.requestId ?? Math.random().toString()

  return await event.logger.wrap(requestId, async () => {
    const header = event.headers['X-Client-Id']
    const headerPresent = header !== undefined

    await mockOrdersCreation()

    return {
      statusCode: 200,
      body: JSON.stringify({
        headerPresent,
        ...event
      }),
    }
  })
})
  .use(middleware)
