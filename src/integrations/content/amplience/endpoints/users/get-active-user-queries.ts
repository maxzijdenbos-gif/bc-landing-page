export const USER_INFO_QUERY = `
      query getusersdetails {
        viewer {
          ... on User {
            assignedOrganizationRoles {
                roles
              }
            assignedCMSRepositoryRoles {
              cmsRepositoryId
            }
            assignedCMSHubRoles {
              cmsHubId
            }
            teams{
              assignedCMSHubRoles{
                cmsHubId
                roles
              }
              assignedCMSRepositoryRoles{
                cmsRepositoryId
                roles
              }
            }
          }
        }
      }`;
