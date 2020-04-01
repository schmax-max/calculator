const fs = require('fs')

exports.algo_input = JSON.parse(fs.readFileSync(`./tests/data/algo_input.json`, 'UTF-8'))
exports.body = JSON.parse(fs.readFileSync(`./tests/data/body.json`, 'UTF-8'))
exports.links = JSON.parse(fs.readFileSync(`./tests/data/links.json`, 'UTF-8'))
exports.url_info = JSON.parse(fs.readFileSync(`./tests/data/url_info.json`, 'UTF-8'))
exports.word_arrays = JSON.parse(fs.readFileSync(`./tests/data/word_arrays.json`, 'UTF-8'))
