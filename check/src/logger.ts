import { AsyncLocalStorage } from 'async_hooks'

const storage = new AsyncLocalStorage<string>()

export const logger = {
	debug (...args: any[]) {
		const id = storage.getStore()
		if (id) {
			console.log(`${id}: `, ...args)
		}
	},

	wrap<T> (id: string, fn: () => T) {
		return storage.run(id, fn)
	}
}