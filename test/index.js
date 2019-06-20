var expect = require('chai').expect,
	should = require('chai').should(),
	logger = require('../index'),
	info = logger.log;

describe('#info', function() {
	it('returns undefined', function() {
		expect(info('some message')).to.be.undefined;
	});

	it('returns should not exists', function() {
		should.not.exist(info('some message'));
	});

});

describe('Date', function(){
	it('should exists', function() {
		should.exist(new Date());
	});

});
