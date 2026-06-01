import { mainNavigationAdapter } from 'integrations/content/amplience/endpoints/navigation/navigation.adapter';
import { getContentClient } from '../get-content/get-content-client';
import {
  HierarchyProps,
  MainNavigationResponse,
  NavigationAdaptor,
  NavigationHierarchyNode,
  TraverseHierarchy,
} from './navigation.types';

export interface TraverseHierarchyReturn {
  children: TraverseHierarchyReturn[];
  content: NavigationHierarchyNode;
}

async function fetchChildren({
  contentId,
  locale,
  stagingEnvironment,
}: HierarchyProps) {
  const response = await getContentClient({
    locale,
    stagingEnvironment,
  })
    .filterByParentId<NavigationHierarchyNode>(contentId)
    .sortBy('default', 'ASC')
    .request({
      depth: 'all',
      format: 'inlined',
    });

  return response.responses || [];
}

async function buildHierarchy({
  contentId,
  locale,
  stagingEnvironment,
}: HierarchyProps): Promise<TraverseHierarchyReturn[]> {
  const children = await fetchChildren({
    contentId,
    locale,
    stagingEnvironment,
  });

  // Map each child and recursively fetch its children
  const childrenWithHierarchy = await Promise.all(
    children.map(async (child) => ({
      children: await buildHierarchy({
        contentId: child.content._meta.deliveryId as string,
        locale,
        stagingEnvironment,
      }),
      content: child.content,
    })),
  );

  return childrenWithHierarchy;
}

export async function traverseHierarchy({
  contentItem,
  locale,
  stagingEnvironment,
}: TraverseHierarchy): Promise<TraverseHierarchyReturn> {
  const deliveryId = contentItem._meta.deliveryId ?? ''; // there should always be a deliveryId

  const hierarchy = await buildHierarchy({
    contentId: deliveryId,
    locale,
    stagingEnvironment,
  });

  return {
    children: hierarchy,
    content: contentItem,
  };
}

const navigationDeliveryKey = (locale: Locale) => {
  return `${locale}-navigation`;
};

export const getNavigation = async (
  locale: string,
  stagingEnvironment?: string,
): Promise<NavigationAdaptor | object> => {
  const client = getContentClient({ locale, stagingEnvironment });

  try {
    const rootNodeResponse = await client.getContentItemByKey(
      navigationDeliveryKey(locale),
    );
    const cleanedResponse = JSON.parse(JSON.stringify(rootNodeResponse));

    const hierarchy = await traverseHierarchy({
      contentItem: cleanedResponse,
      locale,
      stagingEnvironment,
    });

    if (cleanedResponse?._meta?.deliveryId === undefined) {
      throw new Error('No deliveryId found');
    }

    const completeNavigation = {
      ...(hierarchy.content as MainNavigationResponse),
      navigationLinks: hierarchy.children,
      topLevelDeliveryId: cleanedResponse._meta.deliveryId,
    };

    return mainNavigationAdapter(completeNavigation);
  } catch (error) {
    return {};
  }
};
