/* eslint-disable sort-keys */
import type { CartData } from 'integrations/ecommerce-api/ecommerce-api.types';
import { BREADCRUMB_CURRENT_PAGE_PATH } from 'mocks/endpoints/breadcrumb/breadcrumb.mock';
import { MainNavigationProps } from './main-navigation';

const defaultStub: MainNavigationProps & { skipLinkText: string } = {
  crossBrandLinks: [
    {
      brandDefinition: 'liv',
      crossBrandImageAltText: 'Hover text',
      crossBrandLink: [
        {
          externalLink: 'https://www.liv-cycling.com/dk',
          linkText: 'For her',
          target: '_blank',
        },
      ],
    },
    {
      brandDefinition: 'momentum',
      crossBrandImageAltText: 'Hover text',
      crossBrandLink: [
        {
          externalLink: 'https://www.liv-cycling.com/dk',
          linkText: 'For city life',
          target: '_blank',
        },
      ],
    },
    {
      brandDefinition: 'giant',
      crossBrandImageAltText: 'Hover text',
      crossBrandLink: [
        {
          externalLink: 'https://www.liv-cycling.com/dk',
          linkText: 'For [...]',
          target: '_blank',
        },
      ],
    },
  ],
  navigationLinks: [
    {
      content: {
        _meta: {
          schema: 'https://giant.com/hierarchies/NavigationHierarchyNode',
          name: 'Bikes',
          deliveryId: '3288b7ff-d23e-4342-b14c-032e5e6f8565',
          hierarchy: {
            parentId: '728f15f9-5d30-4e7e-9623-f484a31f28a6',
            root: false,
          },
        },
        hideNode: false,
        hideAsHighlighted: false,
        navigationLinks: [
          {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyLinkNode',
            },
            linkObject: [
              {
                internalLinkRef: [
                  {
                    id: 'a67f292f-f84c-4311-8922-d9d24f966632',
                    contentType: 'https://giant.com/pages/ProductListPage',
                    _meta: {
                      schema:
                        'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                    },
                  },
                ],
                linkText: 'Shop all bikes',
                internalLink: '/en-us/bikes',
                target: '_self',
              },
            ],
            hideNode: false,
          },
        ],
        title: 'Bikes',
        ranking: 1,
      },
      children: [
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Mountain',
              deliveryId: 'deb2c7db-1b41-4620-a5d9-a2a08a0e2006',
              hierarchy: {
                parentId: '3288b7ff-d23e-4342-b14c-032e5e6f8565',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Mountain',
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'a64745d7-9253-4314-9c4a-ae2da65d11ce',
                        contentType: 'https://giant.com/pages/ProductListPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/bikes/mountain',
                    linkText: 'Shop all Mountain bikes',
                  },
                ],
              },
            ],
            ranking: 2,
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Road',
              deliveryId: '15f79d5f-df3a-4199-95f9-fcac4664ac19',
              hierarchy: {
                parentId: '3288b7ff-d23e-4342-b14c-032e5e6f8565',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Road',
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Learn more',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'c633df36-f23f-49cc-a26f-39ae53d399fe',
                        contentType: 'https://giant.com/pages/ProductListPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink: '/en-us/bikes/road',
                    linkText: 'Shop all Road Bikes',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    linkText: 'Aero Dynamic',
                    internalLinkRef: [
                      {
                        id: '080e1dc5-1159-4f2d-ba51-bab939a7ab29',
                        contentType: 'https://giant.com/pages/ProductListPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/bikes/road/aero-dynamic',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'd70005d2-f5d2-41fc-a5d3-f84ce24b1250',
                        contentType: 'https://giant.com/pages/ProductListPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    linkText: 'Triathlon & Time Trial',
                    internalLink: '/en-us/bikes/road/triathlon-and-time-trial',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '76656a49-b2ca-4e42-bbc3-904ad21fd77c',
                        contentType:
                          'https://giant.com/pages/ExploreSubCategoryPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/explore/road/racing',
                    linkText: 'Racing',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Endurance',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Hybrid / All-Rounder',
                  },
                ],
              },
            ],
            ranking: 1,
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Cross & Gravel',
              deliveryId: '5f975232-b188-4e7e-86a5-2fbd15dd356c',
              hierarchy: {
                parentId: '3288b7ff-d23e-4342-b14c-032e5e6f8565',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Cross & Gravel',
            ranking: 3,
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Shop all Cross & Gravel bikes',
                  },
                ],
              },
            ],
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Fitness & City',
              deliveryId: '137b0a4d-fb8c-4cc3-a12c-eb1c3f1814a1',
              hierarchy: {
                parentId: '3288b7ff-d23e-4342-b14c-032e5e6f8565',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Fitness & City',
            ranking: 4,
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Shop all Fitness & City bikes',
                  },
                ],
              },
            ],
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Electric',
              deliveryId: '8fcbb86c-7ef1-4d46-be0c-405e96c83b85',
              hierarchy: {
                parentId: '3288b7ff-d23e-4342-b14c-032e5e6f8565',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Electric',
            ranking: 5,
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Shop all Electric bikes',
                  },
                ],
              },
            ],
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Kids',
              deliveryId: '4b9768ac-025f-417a-af42-aec1ae0f23e2',
              hierarchy: {
                parentId: '3288b7ff-d23e-4342-b14c-032e5e6f8565',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Kids',
            ranking: 6,
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Shop all Kids bikes',
                  },
                ],
              },
            ],
          },
          children: [],
        },
      ],
    },
    {
      content: {
        _meta: {
          schema: 'https://giant.com/hierarchies/NavigationHierarchyNode',
          name: 'Gear',
          deliveryId: 'f66aa11d-ea6b-471d-be10-6c9399cd16cb',
          hierarchy: {
            parentId: '728f15f9-5d30-4e7e-9623-f484a31f28a6',
            root: false,
          },
        },
        hideNode: false,
        hideAsHighlighted: false,
        navigationLinks: [
          {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyLinkNode',
            },
            linkObject: [
              {
                internalLinkRef: [
                  {
                    id: 'a67f292f-f84c-4311-8922-d9d24f966632',
                    contentType: 'https://giant.com/pages/ProductListPage',
                    _meta: {
                      schema:
                        'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                    },
                  },
                ],
                linkText: 'Shop all',
                internalLink: '/en-us/bikes',
                target: '_self',
              },
            ],
            hideNode: false,
          },
        ],
        title: 'Gear',
        ranking: 2,
      },
      children: [],
    },
    {
      content: {
        _meta: {
          schema: 'https://giant.com/hierarchies/NavigationHierarchyNode',
          name: 'Discover',
          deliveryId: '95fc8dd2-d0b8-41e8-a592-8cfa9db1dc35',
          hierarchy: {
            parentId: '728f15f9-5d30-4e7e-9623-f484a31f28a6',
            root: false,
          },
        },
        hideNode: false,
        hideAsHighlighted: false,
        title: 'Discover',
        ranking: 3,
      },
      children: [
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Road',
              deliveryId: 'a0d3bb63-5ca1-494c-816c-fe2643cca5b1',
              hierarchy: {
                parentId: '95fc8dd2-d0b8-41e8-a592-8cfa9db1dc35',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Road',
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '40ca259f-3190-45a5-9206-6b6a0043ad90',
                        contentType:
                          'https://giant.com/pages/ExploreCategoryPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/explore/road',
                    linkText: 'Explore all Road bikes',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'ac4e7e64-93a5-4f87-887b-98aa86011976',
                        contentType: 'https://giant.com/pages/ExploreRangePage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/explore/road/racing/tcr',
                    linkText: 'Racing',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '32b8c12e-d826-4fd2-9ee1-1567f4d2a047',
                        contentType:
                          'https://giant.com/pages/ExploreSubCategoryPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/explore/road/endurance',
                    linkText: 'Endurance',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'fcbaa7f4-40a9-4ebc-9b14-171e64a737c0',
                        contentType:
                          'https://giant.com/pages/ExploreSubCategoryPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/explore/road/aero-race',
                    linkText: 'Aero Race',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Hybrid / All-Rounder',
                  },
                ],
              },
            ],
            ranking: 1,
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Mountain',
              deliveryId: 'f3ee4492-64c0-48e7-b134-3223e744a60d',
              hierarchy: {
                parentId: '95fc8dd2-d0b8-41e8-a592-8cfa9db1dc35',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Explore all Mountain bikes',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Downhill',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Enduro',
                    internalLinkRef: [
                      {
                        id: '0dab034d-e8a0-40d5-96e5-69f7960e5a9a',
                        contentType:
                          'https://giant.com/pages/ExploreSubCategoryPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink: `/${BREADCRUMB_CURRENT_PAGE_PATH}/hardtail`,
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Trail',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'XC - Cross Country',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Full Suspension',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Hardtail',
                  },
                ],
              },
            ],
            title: 'Mountain',
            ranking: 2,
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Cross & Gravel',
              deliveryId: 'fdb9d38a-9c42-4c28-ad01-d61abbe7be80',
              hierarchy: {
                parentId: '95fc8dd2-d0b8-41e8-a592-8cfa9db1dc35',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Cross & Gravel',
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Explore all Cross & Gravel bikes',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Cyclocross',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Gravel',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Adventure & Trekking',
                  },
                ],
              },
            ],
            ranking: 3,
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Fitness & City',
              deliveryId: '95ca6a91-2771-4e23-9ef7-42a13f1188ca',
              hierarchy: {
                parentId: '95fc8dd2-d0b8-41e8-a592-8cfa9db1dc35',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Explore all Fitness & City bikes',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Fitness',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'City & Commuting',
                  },
                ],
              },
            ],
            title: 'Fitness & City',
            ranking: 4,
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Electric',
              deliveryId: '2a1b569a-b761-404f-81fe-c8c024f1066a',
              hierarchy: {
                parentId: '95fc8dd2-d0b8-41e8-a592-8cfa9db1dc35',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            ranking: 5,
            title: 'Electric',
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: true,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Explore all Electric bikes',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Road',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Mountain',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    target: '_self',
                    linkText: 'Gravel & Adventure',
                  },
                ],
              },
            ],
          },
          children: [],
        },
      ],
    },
    {
      content: {
        _meta: {
          schema: 'https://giant.com/hierarchies/NavigationHierarchyNode',
          name: 'Sale',
          deliveryId: 'bd421adc-acff-4ee6-aab0-35d328af0be9',
          hierarchy: {
            parentId: '728f15f9-5d30-4e7e-9623-f484a31f28a6',
            root: false,
          },
        },
        hideNode: false,
        hideAsHighlighted: true,
        navigationLinks: [
          {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyLinkNode',
            },
            linkObject: [
              {
                internalLinkRef: [
                  {
                    id: 'a67f292f-f84c-4311-8922-d9d24f966632',
                    contentType: 'https://giant.com/pages/ProductListPage',
                    _meta: {
                      schema:
                        'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                    },
                  },
                ],
                linkText: 'All product on sale',
                internalLink: '/en-us/bikes',
                target: '_self',
              },
            ],
            hideNode: false,
          },
          {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyLinkNode',
            },
            linkObject: [
              {
                internalLinkRef: [
                  {
                    id: 'a67f292f-f84c-4311-8922-d9d24f966632',
                    contentType: 'https://giant.com/pages/ProductListPage',
                    _meta: {
                      schema:
                        'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                    },
                  },
                ],
                linkText: 'Bikes on sale here',
                internalLink: '/en-us/bikes',
                target: '_self',
              },
            ],
            hideNode: false,
          },
          {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyLinkNode',
            },
            linkObject: [
              {
                internalLinkRef: [
                  {
                    id: 'a67f292f-f84c-4311-8922-d9d24f966632',
                    contentType: 'https://giant.com/pages/ProductListPage',
                    _meta: {
                      schema:
                        'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                    },
                  },
                ],
                linkText: 'Gear on sale',
                internalLink: '/en-us/bikes',
                target: '_self',
              },
            ],
            hideNode: false,
          },
          {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyLinkNode',
            },
            linkObject: [
              {
                internalLinkRef: [
                  {
                    id: 'a67f292f-f84c-4311-8922-d9d24f966632',
                    contentType: 'https://giant.com/pages/ProductListPage',
                    _meta: {
                      schema:
                        'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                    },
                  },
                ],
                linkText: 'Clearance',
                internalLink: '/en-us/bikes',
                target: '_self',
              },
            ],
            hideNode: false,
          },
          {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyLinkNode',
            },
            linkObject: [
              {
                linkText: 'This link is hidden',
                target: '_self',
              },
            ],
            hideNode: true,
          },
        ],
        title: 'Sale',
        ranking: 4,
      },
      children: [],
    },
    {
      content: {
        _meta: {
          schema: 'https://giant.com/hierarchies/NavigationHierarchyNode',
          name: 'Sandbox',
          deliveryId: '92280ce1-59f0-40c9-af15-7c225c9635bb',
          hierarchy: {
            parentId: '728f15f9-5d30-4e7e-9623-f484a31f28a6',
            root: false,
          },
        },
        hideAsHighlighted: true,
        hideNode: false,
        title: 'Sandbox',
        ranking: 5,
      },
      children: [
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Modules',
              deliveryId: 'a3f9d033-6d94-47cf-81e4-9a66c8830ddd',
              hierarchy: {
                parentId: '92280ce1-59f0-40c9-af15-7c225c9635bb',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Modules',
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'f76f8c11-45b7-4521-ade4-c0ac2dd6e80a',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink: '/en-us/sandbox/module-text-test',
                    linkText: 'Text',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '483cdf21-a3fa-41c0-9274-5d0239aef05d',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink: '/en-us/sandbox/module-accordion',
                    linkText: 'Accordion',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '9fca5f5d-1bca-47cf-bb61-dd0c3dd9f29d',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink: '/en-us/sandbox/module-image-with-credit',
                    linkText: 'Image with credit text',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '79bac5d1-1cda-4595-ad3e-62359e12830c',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink: '/en-us/sandbox/module-table',
                    linkText: 'Table',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'b728be87-4fd4-44a7-ad3a-b909b0b995a8',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink:
                      '/en-us/sandbox/module-portrait-image-gallery',
                    linkText: 'Portrait Image Gallery',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '74e3884d-87df-43f3-a097-868bd7c0c408',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink: '/en-us/sandbox/module-video-teaser',
                    linkText: 'Video Teaser',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'a12bf318-2568-40e3-a49b-ed9c32abfa47',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    internalLink:
                      '/en-us/sandbox/module-product-series-carrousel',
                    linkText: 'Product Series carrousel',
                    target: '_self',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '383ba6d3-6310-4a9c-8833-70f3d955b994',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink:
                      '/en-us/sandbox/page-generic-multiple-modules-white',
                    linkText: 'Module: Anchor (Take you to the table)',
                    anchorLink: 'table',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '49b5e9a6-5322-4b3c-879d-980b01282190',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink:
                      '/en-us/sandbox/paragraph-with-images-or-video',
                    linkText: 'Paragraph with images or video',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'e693dcc8-2034-4f09-9bac-9cfae5ad1963',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/sandbox/newslettersignup',
                    linkText: 'Newsletter Sign Up',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '340ba727-be7c-4581-8f2b-0af3907c08ba',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/sandbox/content-cards',
                    linkText: 'Module - Content cards',
                  },
                ],
              },
            ],
          },
          children: [],
        },
        {
          content: {
            _meta: {
              schema:
                'https://giant.com/hierarchies/NavigationHierarchyNodeChild',
              name: 'Page types',
              deliveryId: 'f86927e6-35d8-45f4-976d-4932dd9252ce',
              hierarchy: {
                parentId: '92280ce1-59f0-40c9-af15-7c225c9635bb',
                root: false,
              },
            },
            hideAsHighlighted: false,
            hideNode: false,
            title: 'Page types',
            navigationLinks: [
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    linkText: 'Generic page w multiple modules - White',
                    internalLinkRef: [
                      {
                        id: '383ba6d3-6310-4a9c-8833-70f3d955b994',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink:
                      '/en-us/sandbox/page-generic-multiple-modules-white',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '7b8e847e-d641-48e2-a1e3-fc2ff3ab943e',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink:
                      '/en-us/sandbox/page-generic-multiple-modules-greyy',
                    linkText: 'Generic page w multiple modules - Grey',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '2aa2f452-1019-4778-adb2-ea068672e36e',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/sandbox/seo',
                    linkText: 'SEO test',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '7d11eb92-ad81-4ea8-a912-2f44d74865a4',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink:
                      '/en-us/sandbox/page-generic-multiple-modules-white/no-hero',
                    linkText: 'Page with no hero',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '11c23bad-cd07-4a2a-8e1a-b5558a96a7b1',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink:
                      '/en-us/sandbox/page-generic-multiple-modules-white/no-hero/page-with-text',
                    linkText: 'Page with long breadcrumb',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: 'e0015f44-019c-4733-bbad-982406c46f63',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    linkText: 'Page with embedded video',
                  },
                ],
              },
              {
                _meta: {
                  schema:
                    'https://giant.com/hierarchies/NavigationHierarchyLinkNodeBlue',
                },
                blueLink: false,
                hideNode: false,
                linkObject: [
                  {
                    internalLinkRef: [
                      {
                        id: '80205fa0-ca7c-426c-b79e-79012bc79a76',
                        contentType: 'https://giant.com/pages/GenericPage',
                        _meta: {
                          schema:
                            'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference',
                        },
                      },
                    ],
                    target: '_self',
                    internalLink: '/en-us/sandbox/image-test',
                    linkText: 'Image Size Test',
                  },
                ],
              },
            ],
          },
          children: [],
        },
      ],
    },
    {
      content: {
        _meta: {
          schema: 'https://giant.com/hierarchies/NavigationHierarchyNode',
          name: 'Stores',
          deliveryId: 'stores-navigation-item',
          hierarchy: {
            parentId: '728f15f9-5d30-4e7e-9623-f484a31f28a6',
            root: false,
          },
        },
        hideNode: false,
        hideAsHighlighted: false,
        linkObject: [
          {
            externalLink: 'https://www.giant-bicycles.com/us/stores',
            linkText: 'Stores',
            target: '_self',
          },
        ],
        title: 'Stores',
      },
      children: [],
    },
  ],

  profileLinks: [
    {
      externalLink: 'https://www.giant.com/my-account',
      linkText: 'My Account',
      target: '_self',
    },
    {
      externalLink: 'https://www.giant.com/wishlisst',
      linkText: 'Wishlist',
      target: '_self',
    },
    {
      externalLink: 'https://www.giant.com/special-market',
      linkText: 'Special market (US)',
      target: '_self',
    },
    {
      externalLink: 'https://www.giant.com/change-language',
      linkText: 'Change Language',
      target: '_self',
    },
  ],
  shopButton: {
    externalLink: 'https://giant-bicycles.com',
    linkText: 'Shop now',
    linkType: 'externalLink',
  },
  isSearchBarEnabled: true,
  isShoppingCartEnabled: true,
  accountButton: {
    externalLink: 'https://www.giant-bicycles.com/us/account/login',
    linkText: 'account Button',
    linkType: 'externalLink',
  },
  skipLinkText: 'skip to main content',
  supportLinks: [
    {
      externalLink: 'https://www.giant.com/find-a-store',
      linkText: 'Find a store',
      target: '_self',
    },
    {
      externalLink: 'https://www.giant.com/support',
      linkText: 'Support',
      target: '_self',
    },
    {
      externalLink: 'https://www.giant.com/bike-finder',
      linkText: 'Bike Finder',
      target: '_self',
    },
  ],
  topLevelDeliveryId: '54341367-a585-48b7-b621-2afc9b9340a8',
};

/** Minimal cart data for Storybook "With filled cart" story. */
export const filledCartStub: CartData = {
  items: [
    {
      id: 1,
      partNumberCode: 'BIKE-001',
      name: 'Example Road Bike',
      imageUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Ch_120%2Cq_80%2Cw_120/rds9f1o3ius7ooaskr5z/MY25AnthemAdvanced293_ColorAOceanTwilight.jpg',
      imageBigUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Ch_120%2Cq_80%2Cw_120/rds9f1o3ius7ooaskr5z/MY25AnthemAdvanced293_ColorAOceanTwilight.jpg',
      url: '/us/bikes/example-road-bike',
      attributes: { Color: 'Blue', Size: 'M' },
      categories: ['Bikes', 'Road'],
      hasNoStock: false,
      isClearanceFinalSale: false,
      quantity: 2,
      price: {
        amount: 1299.99,
        originalAmount: 1499.99,
        currency: 'USD',
        amountFormatted: '$1,299.99',
        originalAmountFormatted: '$1,499.99',
      },
      total: {
        subTotal: 2599.98,
        total: 2599.98,
        currency: 'USD',
        subTotalFormatted: '$2,599.98',
        totalFormatted: '$2,599.98',
      },
    },
    {
      id: 3,
      partNumberCode: 'JERSEY-001',
      name: 'Sportif Road Jersey',
      imageUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Cq_80/cpvjkapab9updq4arrvv/SPORTIFROADJERSEY@BLACKGREY@13420;13421;13422;13423;13424;13425@1Gear.jpg',
      imageBigUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Cq_80/cpvjkapab9updq4arrvv/SPORTIFROADJERSEY@BLACKGREY@13420;13421;13422;13423;13424;13425@1Gear.jpg',
      url: '/us/sportif-road-jersey-giant',
      attributes: { Color: 'Black / Grey', Size: 'Medium' },
      categories: ['Gear', 'Rider Gear', 'Jerseys'],
      hasNoStock: false,
      quantity: 2,
      price: {
        amount: 17,
        originalAmount: 85,
        currency: 'USD',
        amountFormatted: '$17.00',
        originalAmountFormatted: '$85.00',
      },
      total: {
        subTotal: 170,
        total: 34,
        currency: 'USD',
        subTotalFormatted: '$170.00',
        totalFormatted: '$34.00',
        discountTotal: -136,
        discountTotalFormatted: '-$136.00',
      },
      isClearanceFinalSale: true,
    },
    {
      id: 2,
      partNumberCode: 'HELMET-001',
      name: 'Cycling Helmet',
      imageUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Ch_120%2Cq_80%2Cw_120/hbk5buvyolrdppqii3is/RELAY-MIPS-PANTHER-BLACK-800002489-800002490.jpg',
      imageBigUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Ch_120%2Cq_80%2Cw_120/hbk5buvyolrdppqii3is/RELAY-MIPS-PANTHER-BLACK-800002489-800002490.jpg',
      url: '/us/gear/helmets/cycling-helmet',
      attributes: {},
      categories: ['Gear', 'Rider Gear', 'Helmets'],
      hasNoStock: false,
      isClearanceFinalSale: false,
      quantity: 1,
      price: {
        amount: 89.99,
        originalAmount: 89.99,
        currency: 'USD',
        amountFormatted: '$89.99',
        originalAmountFormatted: '$89.99',
      },
      total: {
        subTotal: 89.99,
        total: 89.99,
        currency: 'USD',
        subTotalFormatted: '$89.99',
        totalFormatted: '$89.99',
      },
    },
    {
      id: 4,
      partNumberCode: 'PEDALS-001',
      name: 'Contact Pedals (bundle)',
      imageUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Cq_80/rds9f1o3ius7ooaskr5z/MY25AnthemAdvanced293_ColorAOceanTwilight.jpg',
      imageBigUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Cq_80/rds9f1o3ius7ooaskr5z/MY25AnthemAdvanced293_ColorAOceanTwilight.jpg',
      url: '/us/gear/pedals/contact-pedals',
      attributes: {},
      categories: ['Gear', 'Components', 'Pedals'],
      hasNoStock: false,
      isClearanceFinalSale: false,
      quantity: 1,
      relation: { parentId: 1, type: 'supplementary' },
      price: {
        amount: 0,
        currency: 'USD',
        amountFormatted: '$0.00',
      },
      total: {
        subTotal: 0,
        total: 0,
        currency: 'USD',
        subTotalFormatted: '$0.00',
        totalFormatted: '$0.00',
      },
    },
    {
      id: 5,
      partNumberCode: 'BOTTLE-OOS',
      name: 'Hydration Bottle 750ml (no longer available)',
      imageUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Ch_120%2Cq_80%2Cw_120/ol1xo88rjn1mr6ajjlms/480000269.jpg',
      imageBigUrl:
        'https://images2.giant-bicycles.com/b_white%2Cc_pad%2Ch_120%2Cq_80%2Cw_120/ol1xo88rjn1mr6ajjlms/480000269.jpg',
      url: '/us/gear/bottles/hydration-bottle-750ml',
      attributes: { Color: 'Clear' },
      categories: ['Gear', 'Accessories', 'Bottles'],
      quantity: 5,
      hasNoStock: true,
      isClearanceFinalSale: false,
      maxQuantity: 0,
      price: {
        amount: 12.99,
        currency: 'USD',
        amountFormatted: '$12.99',
      },
      total: {
        subTotal: 64.95,
        total: 64.95,
        currency: 'USD',
        subTotalFormatted: '$64.95',
        totalFormatted: '$64.95',
      },
    },
  ],
  total: {
    subTotal: 2924.92,
    total: 2868.92,
    discountTotal: -136,
    orderHandlingFees: [
      {
        title: 'Destination fee',
        description:
          'Destination Fee reflects costs incurred in transportation, logistics, and other associated fees. The destination fee is non-refundable or negotiable.',
        amount: 75,
        amountFormatted: '$75.00',
      },
      {
        title: 'E-Bike Battery Recycling Fee',
        description:
          '<a href="/us/call2recycle-partnership">Learn more about the E-Bike Battery Recycling Program</a>',
        amount: 5,
        amountFormatted: '$5.00',
      },
    ],
    currency: 'USD',
    subTotalFormatted: '$2,924.92',
    totalFormatted: '$2,868.92',
    discountTotalFormatted: '-$136.00',
  },
};

export default <Record<string, MainNavigationProps & { skipLinkText: string }>>{
  default: defaultStub,
};
