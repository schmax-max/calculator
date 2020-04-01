const { Calc } = require("../model");
const { gateway } = require("./gateway");
const { createLinkReferences, createSingleReference } = require("./createRefs");
const { runCalcs } = require("./runCalcs");

module.exports = { master, commander };

async function master(req) {
  if (gateway(req)) {
    // console.log({req})
    return await commander(req.body);
  } else {
    return;
  }
}

async function commander({ core, links, refs }) {
  try {
    const { content_url, content_type } = core;
    createSingleReference(content_url, refs);
    // if (content_url && links) {
    //  createLinkReferences (content_url, links)
    // }
    const item = await runCalcs(core);
    const options = { upsert: true, new: true };
    const { scores } = await Calc[`${content_type}s`].findOneAndUpdate(
      { content_url },
      item,
      options
    );
    // console.log({scores})
    return scores;
  } catch (e) {
    console.log({ e });
    return;
  }
}
