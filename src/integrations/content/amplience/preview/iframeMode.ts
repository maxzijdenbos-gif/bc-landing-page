import config from 'next.config';
import { RequestHandler } from './types';

export const handleVisualizationRedirect: RequestHandler = async (req, res) => {
  const queryString = Object.entries(req.query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  res.redirect(
    `${config.basePath}/amplience/visualization/pages/content-page?${queryString}`,
  );
};
