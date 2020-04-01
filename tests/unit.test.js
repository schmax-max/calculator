const chai = require('chai')
const mongoose = require('mongoose')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const should = require('chai').should()
chai.use(chaiAsPromised).should()

require ('../config/connection')
const {commander} = require ('../svc')
const {body} = require ('./data')

beforeEach(async () => {
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'connection error'))
    db.once('open', () => {
        console.log('test DB connected!')
    })
});
  
const defaultTimeout = 60 * 1000 

describe('TEST: .... ||', async () => {
    const {scores} = await commander (body)
})


// const scoreInput = {   
//     brevity: 7,
//     recency: 3,
//     citations: 2,
// }
// const expectedBonus = {
//     brevity: +(1 - (scoreInput.brevity-5)/(20-5)).toFixed(3),
//     recency: +(1 - (scoreInput.recency-0)/(7-0)).toFixed(3),
//     citations: +((scoreInput.citations-0)/(5-0)).toFixed(3),
// }
// const expectedFactor = {
//     brevity: +(expectedBonus.brevity * 0.8 + 0.2).toFixed(3),
//     recency: +(expectedBonus.recency * 0.8 + 0.2).toFixed(3),
//     citations: +(expectedBonus.citations * 0.8 + 0.2).toFixed(3),
// }

// const expectedScore = +(expectedFactor.brevity * expectedFactor.recency * expectedFactor.citations).toFixed(3)

// it('correct score calculation:', (done) => {
//     const {score, calcs} = runCalcs(scoreInput)
//     const {factors, bonuses} = calcs
//     expect(bonuses.brevity).to.equal(expectedBonus.brevity)
//     expect(bonuses.recency).to.equal(expectedBonus.recency)
//     expect(bonuses.citations).to.equal(expectedBonus.citations)
//     expect(factors.brevity).to.equal(expectedFactor.brevity)
//     expect(factors.citations).to.equal(expectedFactor.citations)
//     expect(factors.recency).to.equal(expectedFactor.recency)
//     expect(score).to.equal(expectedScore)
//     done()
// })