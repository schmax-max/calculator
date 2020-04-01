'use strict'
const mongoose = require('mongoose');
const {createModels} = require('./createModels')

const schema = new mongoose.Schema( {
    _type: {
        type: "string"
    },
    _id: {
        type: "ObjectId"
    },
    updated_at: {
        type: "date",
        format: "date-time"
    },
    source_url: {
        type: "string"
    },
    source_domain: {
        type: "string"
    },
    content_url: {
        type: "string"
    },
    content_domain: {
        type: "string"
    },
    refs: {
        type: "object"
    }
})

schema.set('toJSON', { virtuals: true });

const collections = [
    'citations',
    'snapshot_curators',
    'snapshot_publishers',
    'snapshot_slugs',
    'snapshot_photos',
    'newsletter_others',
    'newsletter_podcasts',
    'twitter_sports',
    'twitter_others',
    'bubble_left',
    'bubble_left_center',
    'bubble_center',
    'bubble_right_center',
    'bubble_right',
    'bubble_fake_news',
    'bubble_conspiracy',
    'bubble_pro_science',
    'bubble_satire',
]

module.exports = createModels ('reference', schema, collections)
