import { Router } from 'express';
import fs from 'fs';

const survey = new Router();
const availableLanguages = ['en'];

survey.use((req, res, next) => {
  if (!(req.params.language && availableLanguages.includes(req.params.language))) {
    res.status(422).send('INVALID_LANGUAGE');
    return;
  }

  next();
});

survey.get('/:language', async (req, res) => {
  try {
    const schema = await getFileAsync(`./data/schema.${req.params.language}.json`);
    const i18n = await getFileAsync(`./data/i18n.${req.params.language}.json`);

    res.json({
      schema,
      i18n,
    });
  } catch (err) {
    res.status(500).send('Server error. Cannot read data.');
  }
});

function getFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(JSON.parse(data));
    });
  });
}

export default survey;
