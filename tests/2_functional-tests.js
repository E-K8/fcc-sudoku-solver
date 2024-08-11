const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST /api/solve', () => {
    test('Solve a puzzle with valid puzzle string', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.solution,
            '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
          );
          done();
        });
    });

    test('Solve a puzzle with missing puzzle string', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({})
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Required field missing');
          done();
        });
    });

    test('Solve a puzzle with invalid characters', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '5.V91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Invalid characters in puzzle');
          done();
        });
    });

    test('Solve a puzzle with incorrect length', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1777',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(
            res.body.error,
            'Expected puzzle to be 81 characters long'
          );
          done();
        });
    });

    test('Solve a puzzle that cannot be solved', (done) => {
      chai
        .request(server)
        .post('/api/solve')
        .send({
          puzzle:
            '..839.7.575.....964..1.......16.29846.9.333.7..754.....62..5.78.8...3.2...492...1',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'Puzzle cannot be solved');
          done();
        });
    });
  });

  suite('POST /api/check', () => {
    test('Check a puzzle placement with all fields', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '5..91372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3',
          coordinate: 'A4',
          value: '9',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isTrue(res.body.valid);
          done();
        });
    });

    test('Check a puzzle placement with single placement conflict', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
          coordinate: 'A2',
          value: '1',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'row');
          done();
        });
    });

    test('Check a puzzle placement with multiple placement conflicts', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
          coordinate: 'A2',
          value: '2',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'row');
          assert.include(res.body.conflict, 'column');
          done();
        });
    });

    test('Check a puzzle placement with all placement conflicts', (done) => {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle:
            '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
          coordinate: 'D3',
          value: '9',
        })
        .end((err, res) => {
          assert.equal(res.status, 200);
          assert.isFalse(res.body.valid);
          assert.isArray(res.body.conflict);
          assert.include(res.body.conflict, 'row');
          assert.include(res.body.conflict, 'column');
          assert.include(res.body.conflict, 'region');
          done();
        });
    });
  });
});
