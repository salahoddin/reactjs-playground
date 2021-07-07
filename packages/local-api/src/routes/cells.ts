import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Cell {
	id: string
	content: string
	type: 'text' | 'code'
}

export const createCellsRouter = (filename: string, dir: string) => {
	const router = express.Router()
	router.use(express.json())

	const fullpath = path.join(dir, filename)

	router.get('/cells', async (req, res) => {
		try {
			// read the file
			const result = await fs.readFile(fullpath, { encoding: 'utf-8' })

			res.send(JSON.parse(result))
		} catch (err) {
			// if it throws an error then inspect it if it says "file does not exist"
			if (err.code === 'ENOENT') {
				// create a file and add default cells
				await fs.writeFile(fullpath, '[]', 'utf-8')
				res.send([])
			} else {
				throw err
			}
		}

		// parse list of cells out of it
		// send list of cells back to the browser
	})

	router.post('/cells', async (req, res) => {
		// if file exist if not then it will be created
		// take list of cells from the request object
		// serialize it
		const { cells }: { cells: Cell[] } = req.body

		// write cell in to that file
		await fs.writeFile(fullpath, JSON.stringify(cells), 'utf-8')

		res.send({ status: 'OK' })
	})
	return router
}
