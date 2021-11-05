import {promisify} from 'node:util'
import {exec} from 'node:child_process'
import test from 'ava'
import {readPackageSync} from 'read-pkg'

const pkg = readPackageSync()
const expectedVersion = pkg.version
const execPromise = promisify(exec)

test(`Module name/version is '${pkg.name} v${expectedVersion}'.`, async t => {
	const {stdout} = await execPromise('./trucolor.js -vv')
	t.is(stdout.trim(), `${pkg.name} v${expectedVersion}`)
})

test('Module help, no color', async t => {
	const {stderr} = await execPromise('./trucolor.js --help --no-color')
	t.snapshot(stderr)
})

test('Module special help, no color', async t => {
	const {stderr} = await execPromise('./trucolor.js --help special --no-color')
	t.snapshot(stderr)
})

test('Module named help, no color', async t => {
	const {stderr} = await execPromise('./trucolor.js --help named --no-color')
	t.snapshot(stderr)
})
