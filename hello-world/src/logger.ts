import { AsyncLocalStorage } from 'async_hooks'

export class Logger {
	private static instance: Logger
	#storage = new AsyncLocalStorage<string>()
	private constructor () { }

	static get () {
		if (!Logger.instance) Logger.instance = new Logger()
		return Logger.instance
	}

	wrap<T> (id: string, fn: () => Promise<T>) {
		return this.#storage.run(id, fn)
	}

	debug (...args: any[]) {
		const id = this.#storage.getStore()
		if (id) {
			console.log(`${id}: `, ...args)
		}
	}
}