/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
const axios = require('axios');

const getAll = async (req, res) => {
  let followingPage = 2;
  const promises = [];
  for (let i = 1; i <= followingPage; i += 1) {
    promises.push(
      await axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/qa/questions', {
        headers: {
          Authorization: process.env.GITKEY,
        },
        params: {
          product_id: req.params.id,
          page: i,
        },
      })
        .then(({ data }) => {
          followingPage = req.params.page;
          promises.push(data.results);
        }),
    );
  }

  Promise.all(promises)
    .then((data) => {
      const uniq = [];
      const dat = data.filter((dt) => dt).flat();
      const da = dat.filter((el) => {
        const duplicate = uniq.includes(el.question_id);
        if (!duplicate) {
          uniq.push(el.question_id);
          return true;
        }
        return false;
      });
      res.send(da);
    });
};

module.exports.getAll = getAll;
