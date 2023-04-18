import { logger } from './logger'

export const mockOrdersCreation = async () => {
	const orderIds = new Array(20)
		.fill(0)
		.map(() => Math.random().toString().slice(2))

	await Promise.all(orderIds.map(createOrder))
}

async function createOrder (orderId: string) {
	logger.with({ orderId })

	await new Promise((resolve) => {
		setTimeout(() => {
			resolve(null)
		}, 1000)
	})

	formatDate(new Date())

	logger.debug(`Order created successfully!`)
}

function formatDate (date: Date) {
	const res = date.toISOString()

	logger.debug(res)
	const ctx = logger.get()

	// As long as an orderId was placed in a context before this fn call, it will be available here
	const orderIdInContext = ctx?.orderId ?? ''

	return res
}