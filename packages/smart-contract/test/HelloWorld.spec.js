const HelloWorld = artifacts.require('HelloWorld')

contract('HelloWorld', (accounts) => {
	let instance
	before(async () => {
		instance = await HelloWorld.deployed()
	})

	it('says hello', async () => {
		const hello = await instance.sayHello()

		assert.equal(hello, 'Hello, World!')
	})
})
