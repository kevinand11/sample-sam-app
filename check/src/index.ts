import middy, { MiddlewareObj } from "@middy/core"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { logger } from './logger'
import { mockOrdersCreation } from './orders'

type Event = APIGatewayProxyEvent & { logger: typeof logger }

const middleware: MiddlewareObj<Event, APIGatewayProxyResult> = {
  before: async (request) => {
    if (!request.event.logger) request.event.logger = logger
  },
}

export const checkHeader = middy(async (event: Event) => {
  const requestId = event?.requestContext?.requestId ?? Math.random().toString()

  return await event.logger.with({ requestId }, async () => {
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
