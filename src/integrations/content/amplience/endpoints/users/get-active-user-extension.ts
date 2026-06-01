import { DashboardExtension } from 'dc-extensions-sdk';
import {
  DASHBOARD_ALLOWED_ACCESS_ROLES,
  UserInfoAssignedCMSRepositoryRole,
  UserInfoViewer,
  UserState,
} from './get-active-user-extension.types';
import { USER_INFO_QUERY } from './get-active-user-queries';

const getUserGraphqlQuery = async ({
  query,
  extensionSdk,
}: {
  extensionSdk: DashboardExtension;
  query: string;
}) => {
  const vars = { first: 1 };

  try {
    // Approach is not documented in the Amplience documentation, but a method shared directly by the Amplience support team
    const response = await extensionSdk?.connection.request(
      'dc-management-sdk-js:graphql-query',
      {
        query,
        vars,
      },
    );

    return response;
  } catch (error) {
    return undefined;
  }
};

// Gets the active user, from via the extension SDK (DashboardExtension)
export const getUserInfo = async ({
  extensionSdk,
}: {
  extensionSdk: DashboardExtension;
}): Promise<Omit<UserState, 'hubId'> | undefined> => {
  // This query is not part of Amplience SDK, it is a custom query that is sent to the extension SDK
  // This was acquired by the Amplience support team
  try {
    const response = await getUserGraphqlQuery({
      extensionSdk,
      query: USER_INFO_QUERY,
    });

    const userInfo = response?.data?.viewer as UserInfoViewer;
    const assignedCMSRepositoryRoles: UserInfoAssignedCMSRepositoryRole[] = [];

    userInfo?.teams.forEach((team) => {
      team.assignedCMSRepositoryRoles?.forEach((repository) => {
        const hasAccessAllowedRole = repository.roles?.some((role) =>
          DASHBOARD_ALLOWED_ACCESS_ROLES.includes(role),
        );

        if (hasAccessAllowedRole) {
          assignedCMSRepositoryRoles.push(repository);
        }
      });
    });

    const assignedRepositories = assignedCMSRepositoryRoles.map((item) => {
      // Destructure the repositoryId from the cmsRepositoryId
      const [, , repositoryId] = atob(item.cmsRepositoryId).split('/');

      return repositoryId;
    });

    return {
      assignedRepositories,
      teams: userInfo.teams,
    };
  } catch (error) {
    return;
  }
};

export const checkIfUserIsAdmin = (
  userInfo: Omit<UserState, 'assignedRepositories'>,
): boolean => {
  let adminHubId: string | undefined;

  userInfo.teams.forEach((team) => {
    const cmsHubId = team.assignedCMSHubRoles.find((hub) => {
      // Destructure the teamHubId from the cmsHubId
      const [, teamHubId] = atob(hub.cmsHubId).split('/');

      return teamHubId === userInfo.hubId && hub.roles.includes('ADMIN');
    })?.cmsHubId;

    adminHubId = cmsHubId;
  });

  // Destructure the decrypted hubId from the encrypted adminHubId
  const [, decryptedHubId] = adminHubId ? atob(adminHubId).split('/') : [];

  return decryptedHubId === userInfo.hubId;
};
