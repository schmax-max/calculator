const { gateway } = require("./gateway");
const { updateCalc } = require("./update/updateCalc");
const { createLinkReferences, createSingleReference } = require("./createRefs");

module.exports = { master, commander };

async function master(req) {
  if (gateway(req)) {
    if (gateway(req)) {
      return await commander(req.body);
    }
  } else {
    return;
  }
}

async function commander({ core, links, refs }) {
  try {
    createSingleReference(core.content_url, refs);
    // if (content_url && links) {
    //  createLinkReferences (content_url, links)
    // }
    const { scores } = await updateCalc(core);
    // console.log({scores})
    return scores;
  } catch (e) {
    console.log({ e });
    return;
  }
}
