module.exports = (survey) => {
  return `<div style="text-align:center">
  <h1>${survey.title || "Emaily"}
  </h1>
  <h2>I'd like your input</h2>
  <h3>Please answer the following question!</h3>
  <h4>${
    survey.body || `We would love to hear if you're enjoyed our service?`
  }</h4>
  <div>
  <a href="${process.env.SERVER_SIDE_PATH}/api/surveys/${
    survey._id
  }/yes">yes</a>
  <a href="${process.env.SERVER_SIDE_PATH}/api/surveys/${survey._id}/no">no</a>
  </div>
  </div>`;
};
