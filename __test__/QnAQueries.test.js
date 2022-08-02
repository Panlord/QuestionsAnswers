// Test the database queries
// Import stuff
const QnAAPI = require('../server/questionsAnswers/helpers/QnAPostgresDB.js');

// Test suites
describe ('Queries to get all the answers for a specific question', () => {
  it ('returns an array of objects representing the answers', async () => {
    let answerData;
    await QnAAPI.getAllAnswers(1, 1, 5)
      .then((results) => {
        answerData = results.rows[0].array_agg;
      })
      .catch((error) => {
        answerData = error;
      });
    expect(Array.isArray(answerData)).toBe(true);
  });

  describe ('returns answers that have the correct attributes', () => {
    it ('has answer id, body, date, name, helpfulness, and reported', async () => {
      let answerData;
      await QnAAPI.getAllAnswers(1, 1, 5)
        .then((results) => {
          answerData = results.rows[0].array_agg;
        })
        .catch((error) => {
          answerData = error;
        });
      expect(answerData[0].id).toBeTruthy();
      expect(answerData[0].body).toBeTruthy();
      expect(answerData[0].answerer_name).toBeTruthy();
      expect(answerData[0].helpfulness);
      expect(answerData[0].reported);
    });

    describe ('has photos', () => {

      it ('photos is an array', async () => {
        let allAnswerData;
        await QnAAPI.getAllAnswers(1, 1, 5)
          .then((results) => {
            allAnswerData = results.rows[0].array_agg;
          })
          .catch(() => {
            allAnswerData = null;
          });
        expect(Array.isArray(allAnswerData[0].photos)).toBe(true);
      });

      it ('photos is an empty array when there are no photos to the answer', async () => {
        let allAnswerData;
        await QnAAPI.getAllAnswers(1, 1, 5)
          .then((results) => {
            allAnswerData = results.rows[0].array_agg;
          })
          .catch(() => {
            allAnswerData = null;
          });
        expect(Array.isArray(allAnswerData[4].photos)).toBe(true);
        expect(allAnswerData[4].photos.length).toBe(0);
      });

      it ('photos is an array of urls (strings) when the answer has photos', async() => {
        let allAnswerData;
        await QnAAPI.getAllAnswers(1, 1, 5)
          .then((results) => {
            allAnswerData = results.rows[0].array_agg;
          })
          .catch(() => {
            allAnswerData = null;
          });
        expect(allAnswerData[0].photos.length > 0).toBe(true);
        expect(typeof allAnswerData[0].photos[0]).toBe('string');
      });
    });
  });
});


describe ('Queries to get all the questions for a specific product', () => {
  it ('returns an array of objects representing the questions', async () => {
    let questionData;
    await QnAAPI.getAllQuestions(1, 1, 5)
      .then((results) => {
        questionData = results.rows[0].array_agg;
      })
      .catch(() => {
        questionData = null;
      });
    expect(Array.isArray(questionData)).toBe(true);
  });

  it ('returns questions that have the correct attributes', async () => {
    let questionData;
    await QnAAPI.getAllQuestions(1, 1, 5)
      .then((results) => {
        questionData = results.rows[0].array_agg;
      })
      .catch(() => {
        questionData = null;
      });
    expect(questionData[0].question_body).toBeTruthy();
    expect(questionData[0].asker_name).toBeTruthy();
    expect(questionData[0].date);
    expect(questionData[0].helpfulness);
    expect(questionData[0].reported);
    expect(typeof questionData[0].answers).toBe('object');
  });
});
