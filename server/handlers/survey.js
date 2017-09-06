import { Router } from 'express';
import fs from 'fs';

const survey = new Router();
const availableLanguages = ['en'];

const logger = fs.createWriteStream('log.txt', {
  flags: 'a',
});

survey.use('/:language', (req, res, next) => {
  if (!(req.params.language && availableLanguages.includes(req.params.language))) {
    res.status(422).send('INVALID_LANGUAGE');
    return;
  }

  next();
});

survey.get('/:language', async (req, res) => {
  try {
    const schema = await getFileAsync(`./data/schema.${req.params.language}.json`);
    const translations = await getFileAsync(`./data/i18n.${req.params.language}.json`);

    res.json({
      schema,
      translations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error. Cannot read data.');
  }
});

survey.post('/', (req, res) => {
  logger.write(JSON.stringify(req.body));
  res.send(200);
});

function getFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      try {
        const parsedData = JSON.parse(data);
        resolve(parsedData);
      } catch (e) {
        reject(e);
      }
    });
  });
}

export default survey;
