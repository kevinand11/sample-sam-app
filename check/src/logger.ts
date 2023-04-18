import { AsyncLocalStorage } from 'async_hooks'

const storage = new AsyncLocalStorage<Record<string, unknown>>()

export const logger = {
	debug (...args: any[]) {
		const store = storage.getStore()
		if (store) {
			console.log(...args, 'with context: ', JSON.stringify(store))
		} else {
			console.log(...args)
		}
	},

	with<Ctx extends Record<string, unknown>> (ctx: Ctx) {
		const exisitingCtx = storage.getStore() ?? {}
		return storage.enterWith({
			...exisitingCtx,
			...ctx
		})
	},

	get () {
		return storage.getStore()
	}
}