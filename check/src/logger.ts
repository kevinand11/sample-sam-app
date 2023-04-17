import { AsyncLocalStorage } from 'async_hooks'

const storage = new AsyncLocalStorage<Record<string, any>>()

export const logger = {
	debug (...args: any[]) {
		const store = storage.getStore()
		if (store) {
			console.log(...args, 'with context: ', JSON.stringify(store))
		} else {
			console.log(...args)
		}
	},

	with<Ctx extends Record<string, any>, T> (ctx: Ctx, fn: () => T) {
		const exisitingCtx = storage.getStore() ?? {}
		return storage.run({
			...exisitingCtx,
			...ctx
		}, fn)
	},

	get () {
		return storage.getStore()
	}
}