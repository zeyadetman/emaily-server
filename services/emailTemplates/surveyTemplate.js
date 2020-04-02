module.exports = survey => {
  return `<div style="text-align:center">
  <h1>${survey.title || "Emaily"}
  </h1>
  <h2>I'd like your input</h2>
  <h3>Please answer the following question!</h3>
  <h4>${survey.body ||
    `We would love to hear if you're enjoyed our service?`}</h4>
  <div>
  <a href="http://localhost:3000">yes</a>
  <a href="http://localhost:3000">no</a>
  </div>
  </div>`;
};
