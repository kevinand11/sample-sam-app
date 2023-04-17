import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const parseHeader = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const header = event.headers['x-client-id']
    const headerPresent = header !== undefined
    return {
        statusCode: 200,
        body: JSON.stringify(headerPresent)
    }
}