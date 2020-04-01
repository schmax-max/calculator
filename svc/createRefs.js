const moment = require('moment-timezone')
const URL = require('url')
const {Reference} = require('../model')

module.exports = {createLinkReferences, createSingleReference}

async function createLinkReferences (content_url, links) {
  for (linkType in links) {
    try {
      const linkArray = links[linkType]
      for (let i=0; i<linkArray.length; i++) {
        const refs = {
          source_url: content_url,
          source_type: 'citations',
        }
        const ref = await createSingleReference (linkArray[i], refs)
      }
    } catch(e) {
      console.log({e})
    }
  }
  return
}


async function createSingleReference (content_url, refs) {
  const updated_at = moment().tz('America/Chicago').toISOString()
  const {source_url, source_type} = refs
  
  // console.log({source_url})
  refs.is_plug = getDomain (source_url) === getDomain (content_url)
  const find = {source_url, content_url}
  const item = {updated_at, content_url, refs}
  const options = {upsert: true, new: true}
  
  // console.log({item})
  if (Reference[source_type]) {
    await Reference[source_type].findOneAndUpdate(find, item, options)
  } else {
    console.log({source_type})  
  }
  
  return
}



function getDomain (url) {
  let domain = URL.parse(url).hostname
  if (domain) {
      domain = domain.replace('www.', '')
  }
  return domain
}
