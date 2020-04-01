const moment = require('moment-timezone')
const {inputValues} = require('./inputValues')
const {Reference} = require('../model')

module.exports = {runCalcs}

async function runCalcs ({content_url, content_minutes, content_type, publication_date}) {  
  const algo_input = {
    recency: publication_date,
    brevity: content_minutes,
  }
  const processed_algo_input = await processAlgoInput (content_url, algo_input)
  // console.log({processed_algo_input})
  const scores = {
    objective: 1,
    curated: 1,
    combined: 1
  }
  const objectiveMeasures = [
    'recency',
    'brevity'
  ]
  const bonuses = {}
  const factors = {}
  const weighted = {}
  const multipliers = {}

  Object.keys(processed_algo_input).forEach((key) => {
    const {floors, weights} = inputValues
    const shortKey = key.split('_')[0]
    const floor = floors[key] || floors[shortKey]
    const weight = weights[key] || weights[shortKey]
    
    bonuses[key] = getBonus(key, processed_algo_input[key])
    factors[key] = +(bonuses[key] * (1-floor) + floor).toFixed(3)
    weighted[key] = +(Math.pow(factors[key], weight)).toFixed(3)
    multipliers[key] = +(Math.pow(factors[key], weight) / Math.pow(floor, weight)).toFixed(3)
    if (objectiveMeasures.indexOf(key) === -1) {
      scores.objective = +(scores.objective*weighted[key]).toFixed(3)
    } else {
      scores.curated = +(scores.curated*weighted[key]).toFixed(3)
    }
    scores.combined = +(scores.combined*weighted[key]).toFixed(3)
  })
  // console.log({weighted})
  const updated_at = moment().tz('America/Chicago').toISOString()
  const calcs = { bonuses, factors, multipliers, processed_algo_input }
  const item = { updated_at, calcs, scores, algo_input }
  return item
}

async function processAlgoInput (content_url, {brevity, recency}) {
  const processed = await countReferences (content_url)
  processed.brevity = brevity
  processed.recency = moment().tz('America/Chicago').diff(moment(recency), 'days')
  // console.log({processed})
  return processed
}


function getBonus (type, value) {
  type = type.split('_')[0]
  const {min, max} = inputValues[type] || inputValues['references']
  const range = max - min
  const excess = Math.max(0, value - min)
  let bonus = Math.max(0, Math.min(1, excess/range))

  const inverseTypes = [
    'brevity',
    'recency'
  ]
  if (inverseTypes.indexOf(type) > -1) {
    bonus = 1-bonus
  }
  return +(bonus).toFixed(3)
}


async function countReferences (content_url) {
  let references = {}
  for (referenceType in Reference) {
    try {
      references[referenceType] = await Reference[referenceType].countDocuments({content_url})
    } catch(e) {
      console.log({e})
    }
  }
  return references
}