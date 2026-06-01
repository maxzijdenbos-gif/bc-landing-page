type CMSRoles =
  | 'MEMBER'
  | 'ADMIN'
  | 'DEVELOPER'
  | 'PUBLISHER'
  | 'AUTHOR'
  | 'NONE';

export const DASHBOARD_ALLOWED_ACCESS_ROLES: CMSRoles[] = [
  'ADMIN',
  'DEVELOPER',
  'PUBLISHER',
  'AUTHOR',
];

export interface UserInfoAssignedCMSRepositoryRole {
  cmsRepositoryId: string;
  roles: CMSRoles[];
}

interface UserInfoAssignedCMSHubRole {
  cmsHubId: string;
}

interface UserInfoTeamsAssignedCMSHubRole {
  cmsHubId: string;
  roles: CMSRoles[];
}

export interface UserInfoViewer {
  assignedCMSHubRoles: UserInfoAssignedCMSHubRole[];
  assignedCMSRepositoryRoles: UserInfoAssignedCMSRepositoryRole[];
  teams: {
    assignedCMSHubRoles: UserInfoTeamsAssignedCMSHubRole[];
    assignedCMSRepositoryRoles: UserInfoAssignedCMSRepositoryRole[];
  }[];
}

export interface UserState {
  assignedRepositories: string[];
  hubId: string;
  teams: UserInfoViewer['teams'];
}

export interface UserInfoPayload {
  hubId: string;
  userId: string;
}
