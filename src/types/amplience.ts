import 'dc-delivery-sdk-js';

declare module 'dc-management-sdk-js' {
  interface ContentItem {
    lastPublishedDate: string;
    lastPublishedVersion: string;
  }
}
