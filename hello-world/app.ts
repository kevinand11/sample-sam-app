import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export const lambdaHandler = async (_: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'hello world',
            }),
        }
    } catch (err) {
        console.log(err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        }
    }
}

export const parseHeader = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const header = event.headers['x-client-id']
    const headerPresent = header !== undefined
    return {
        statusCode: 200,
        body: JSON.stringify(headerPresent),
    }
}
