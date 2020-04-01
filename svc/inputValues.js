'use strict'


const inputValues = {
  floors: { // lower floor means bigger impact
    brevity: 0.2,
    recency: 0.2,
    bubble: 0.9,
    citations: 0.7,
    snapshot: 0.5,
    twitter: 0.5,
    newsletter: 0.2,
  },
  weights: {
    brevity: 1,
    recency: 1,
    bubble: 0.2,
    citations: 0.2,
    snapshot: 0.2,
    twitter: 0.2,
    newsletter: 0.2,
  },
  brevity: {
    min: 5, // minutes
    max: 20, // minutes
  },
  recency: {
    min: 0, // days
    max: 7, // days
  },
  references: {
    min: 0, // references
    max: 5, // references
  },
  wordsPerMinute: 200,
}

module.exports = {inputValues}

