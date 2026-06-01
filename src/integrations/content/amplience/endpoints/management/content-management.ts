import { DynamicContent } from 'dc-management-sdk-js';
import config from 'next.config';
import { AMPLIENCE_ACCESS_TOKEN_NAME } from '../../types/amplience-setting-types';
import { UserState } from '../users/get-active-user-extension.types';
import {
  CreateLocalContentItemPayload,
  ManagementClientConfig,
  UpdateContentItemPayload,
} from './content-management.types';

export const createManagementClient = ({
  patToken,
}: ManagementClientConfig) => {
  return new DynamicContent({
    patToken,
  });
};

export const getGlobalContentItems = async (
  user?: UserState | null,
  amplienceIDToken?: string,
) => {
  try {
    const response = await fetch(
      `${config.basePath}/api/amplience/management/content-items?${AMPLIENCE_ACCESS_TOKEN_NAME}=${amplienceIDToken}`,
      {
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      const json = await response.json();

      throw TypeError(json[0].message);
    }
    const json = await response.json();

    return json;
  } catch (error) {
    throw new Error(error as any);
  }
};

// guarded by middleware
export const updateContentItem = async (payload: UpdateContentItemPayload) => {
  if (!payload?.token) return;
  try {
    const response = await fetch(
      `${config.basePath}/api/amplience/management/update-content-item?${AMPLIENCE_ACCESS_TOKEN_NAME}=${payload.token}`,
      {
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      const json = await response.json();

      throw new Error(json[0].message);
    }
    const json = await response.json();

    return json;
  } catch (error) {
    throw new Error(error as any);
  }
};

// guarded by middleware
export const createLocalContentItem = async (
  payload: CreateLocalContentItemPayload,
): Promise<{ newContentItemId: string } | void> => {
  if (!payload?.token) return;

  try {
    const response = await fetch(
      `${config.basePath}/api/amplience/management/create?${AMPLIENCE_ACCESS_TOKEN_NAME}=${payload.token}`,
      {
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      const json = await response.json();

      throw TypeError(json[0].message);
    }
    const json = await response.json();

    return json;
  } catch (error) {
    throw TypeError(error as any);
  }
};

export const getAllowedSchemasAsChildren = async ({
  amplienceIDToken,
  hubId,
}: {
  amplienceIDToken?: string;
  hubId?: string;
}) => {
  if (!amplienceIDToken || !hubId) return;

  try {
    const response = await fetch(
      `${config.basePath}/api/amplience/management/hub-schemas?${AMPLIENCE_ACCESS_TOKEN_NAME}=${amplienceIDToken}`,
      {
        body: JSON.stringify({ hubId }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      },
    );

    if (!response.ok) {
      const json = await response.json();

      throw TypeError(json[0].message);
    }
    const json = await response.json();

    return json;
  } catch (error) {
    throw new Error(error as any);
  }
};
