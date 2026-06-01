import createClient from 'openapi-fetch';
import createReactQueryClient from 'openapi-react-query';
import type { paths } from './ecommerce-api.schema';

/**
 * Client calls the Next.js API route proxy (/api/ecommerce) so the APIM subscription key
 * is never sent to the browser. Set ECOMMERCE_API_URL and ECOMMERCE_OCP_APIM_SUBSCRIPTION_KEY
 * in .env (server-only). When NEXT_PUBLIC_AMPLIENCE_BASE_PATH is set, the app is served
 * under that path so the proxy URL must include it.
 */
const baseUrl =
  (process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH
    ? `/${process.env.NEXT_PUBLIC_AMPLIENCE_BASE_PATH}`
    : '') + '/api/ecommerce';

/**
 * Type-safe E-commerce API client generated from the OpenAPI spec.
 * Use with React Query: queryFn: () => ecommerceApi.GET("/carts/{cartGuid}/summary", { params: { path: { cartGuid } } })
 */
export const ecommerceApi = createClient<paths>({
  baseUrl,
});

/**
 * E-commerce API with typed useQuery / useMutation hooks (openapi-react-query).
 * Use inside React components that are wrapped in QueryClientProvider.
 * Example: ecommerceApiQuery.useQuery("get", "/carts/{cartGuid}/summary", { params: { path: { cartGuid } } })
 */
export const ecommerceApiQuery = createReactQueryClient(ecommerceApi);
