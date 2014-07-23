// Key derivation test.
QUnit.asyncTest('deriveKey', function(assert) {
	'use strict';
	miniLock.session = {
		keys: {},
		salt: null,
		keyPairReady: false,
		invalidKey: false
	}
	var passphrase = 'This passphrase is supposed to be good enough for miniLock. :-)'
	miniLock.user.unlock(passphrase)
	assert.deepEqual(miniLock.session.keyPairReady, false, 'keyPairReady starts as false')
	assert.deepEqual(Object.keys(miniLock.session.keys).length, 0, 'sessionKeys is empty')
	var keyInterval = setInterval(function() {
		if (miniLock.session.keyPairReady) {
			clearInterval(keyInterval)
			assert.deepEqual(Object.keys(miniLock.session.keys).length, 2, 'sessionKeys is filled')
			assert.deepEqual(miniLock.session.keyPairReady, true, 'keyPairReady set to true')
			assert.deepEqual(typeof(miniLock.session.keys), 'object', 'Type check')
			assert.deepEqual(typeof(miniLock.session.keys.publicKey), 'object', 'Public key type check')
			assert.deepEqual(typeof(miniLock.session.keys.secretKey), 'object', 'Secret key type check')
			assert.deepEqual(miniLock.session.keys.publicKey.length, 32, 'Public key length')
			assert.deepEqual(miniLock.session.keys.secretKey.length, 32, 'Secret key length')
			var decodedID = miniLock.util.decodeID(miniLock.session.miniLockID)
			assert.deepEqual(decodedID.publicKey.length, 32, 'miniLockID.publicKey length')
			assert.deepEqual(decodedID.salt.length, 16, 'miniLockID.salt length')
			QUnit.start()
		}
	}, 500)
})
