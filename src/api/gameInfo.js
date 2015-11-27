import { Router } from 'express';
import { getXml } from '../core/HttpClient';
import { join } from 'path';

const router = new Router();
export default router;

router.get('/', async (req, res, next) => {
  try {
    const id = req.query.id;
    const content = await getXml(join("http://www.boardgamegeek.com/xmlapi/boardgame/", id));

    if (!content) {
      return res.status(404).send({error: `The id '${id}' is not found.`});
    }
    res.status(200).send(content);
  } catch (e) {
    next(e);
  }
});
