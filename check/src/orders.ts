import { logger } from './logger'

export const mockOrdersCreation = async () => {
	const orderIds = Array.from({ length: 20 }, () => Math.random().toString().slice(2))

	await Promise.all(orderIds.map(createOrder))
}

async function createOrder (orderId: string) {
	logger.with({ orderId })

	await new Promise((resolve) => {
		setTimeout(() => {
			console.log(orderId)
			formatDate(new Date())
			resolve(null)
		}, Math.random() * 1000)
	})

	logger.debug(`Order created successfully!`)
}

function formatDate (date: Date) {
	const res = date.toISOString()

	logger.debug(res)
	const ctx = logger.get()

	// As long as an orderId was placed in a context before this fn call, it will be available here
	const orderIdInContext = ctx?.orderId ?? ''
	ctx?.requestId

	return res
}