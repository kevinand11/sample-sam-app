const { AsyncLocalStorage } = require('node:async_hooks')
const http = require('node:http')

const asyncLocalStorage = new AsyncLocalStorage()

function logWithId (msg) {
	const id = asyncLocalStorage.getStore()
	console.log(`${id !== undefined ? id : '-'}:`, msg)
}

let idSeq = 0
http.createServer((req, res) => {
	console.log(asyncLocalStorage.getStore())
	asyncLocalStorage.run(idSeq++, async () => {
		logWithId('start')
		// Imagine any chain of async operations here
		await Promise.all(new Array(10).fill(0).map(async (_, idx) => {
			logWithId("haha" + idx)
		}))
		res.end()
		return 2
	})
}).listen(8080)

http.get('http://localhost:8080')
http.get('http://localhost:8080')
// Prints:
//   0: start
//   1: start
//   0: finish
//   1: finish