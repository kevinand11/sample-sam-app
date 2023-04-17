import { logger } from './logger'

export const mockOrdersCreation = async () => {
	const orderIds = new Array(20)
		.fill(0)
		.map(() => Math.random().toString())

	await Promise.all(orderIds.map(async (orderId) => {
		await createOrder(orderId)
	}))
}

async function createOrder (orderId: string) {
	logger.debug(`Creating order ${orderId}!`)

	await new Promise((resolve) => {
		setTimeout(() => {
			resolve(null)
		}, 1000)
	})

	logger.debug(`Order ${orderId} created successfully!`)
}