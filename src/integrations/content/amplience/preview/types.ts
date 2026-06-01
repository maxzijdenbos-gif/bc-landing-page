import { NextApiRequest, NextApiResponse } from 'next';

export type RequestHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void>;

export interface GlobalSettingsResponse {
  isSearchBarEnabled?: boolean;
  isShoppingCartEnabled?: boolean;
  previewTime?: number;
}

export interface TokenPayload {
  entryId?: string;
  sessionDuration: number;
  stagingEnvironment: string;
  tokenExpiry: Date;
}
