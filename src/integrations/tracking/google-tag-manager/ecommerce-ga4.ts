import type {
  CartData,
  CartItemData,
} from 'integrations/ecommerce-api/ecommerce-api.types';

// GA4 e-commerce documentation: https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtm

/**
 * GA4 `item_brand`: Liv properties (e.g. www.liv-cycling.com) use `liv`, Giant uses `giant`.
 */
function resolveGa4ItemBrand(): 'liv' | 'giant' {
  return process.env.NEXT_PUBLIC_THEME_NAME === 'liv' ? 'liv' : 'giant';
}

/**
 * GA4 `item_id` aligned with Giant.Website (e.g.:
 * `bikemodel-{id}` for bikes, `gearproduct-{id}` for gear (legacy ProductTypeId !== 1).
 */
export function ga4ItemIdFromCartItem(item: CartItemData): string {
  return item.productType === 'bike'
    ? `bikemodel-${item.productId}`
    : `gearproduct-${item.productId}`;
}

/** ISO 4217 lowercase, aligned with B2C `trackEventGlobalAndLocalGA4` string handling. */
export function normalizeGa4Currency(currency: string): string {
  return currency.trim().toLowerCase();
}

/**
 * GA4 `item_variant` aligned with B2C cart events: Size, then Color (then lowercased as one string).
 * Using `Object.values` caused Color-before-Size (API attribute order) and split the same SKU across different variant rows in GA4.
 */
function itemVariantFromAttributes(
  attributes: CartItemData['attributes'],
): string | undefined {
  if (!attributes || typeof attributes !== 'object') return undefined;

  const get = (canonicalKey: string): string | undefined => {
    const entry = Object.entries(attributes).find(
      ([k]) => k.toLowerCase() === canonicalKey.toLowerCase(),
    );
    const v = entry?.[1]?.trim();
    return v ? v : undefined;
  };

  const size = get('Size');
  const color = get('Color');
  const usage = get('Usage');
  const parts: string[] = [];

  if (size) parts.push(size);
  if (color) parts.push(color);

  if (parts.length === 0) {
    if (usage) parts.push(usage);
    else {
      const reserved = new Set(['size', 'color', 'usage']);
      const extra = Object.entries(attributes)
        .filter(
          ([k, v]) => !reserved.has(k.toLowerCase()) && Boolean(v?.trim()),
        )
        .sort(([a], [b]) =>
          a.localeCompare(b, undefined, { sensitivity: 'base' }),
        )
        .map(([, v]) => v.trim());
      parts.push(...extra);
    }
  }

  if (parts.length === 0) return undefined;
  return parts.join(' ').toLowerCase();
}

/**
 * Per-unit list/reference `price` (B2C: `PriceOriginal` on the line).
 */
function ga4UnitListPrice(item: CartItemData): number | undefined {
  const { originalAmount, amount } = item.price;
  if (originalAmount !== undefined && originalAmount !== null) {
    return originalAmount;
  }
  return amount ?? undefined;
}

/**
 * Per-unit discount (list − selling), aligned with B2C `discount` on items.
 */
function ga4UnitDiscount(item: CartItemData): number {
  const original = item.price.originalAmount;
  const current = item.price.amount;
  if (
    original !== undefined &&
    original !== null &&
    current !== undefined &&
    current !== null &&
    original > current
  ) {
    return original - current;
  }
  return 0;
}

/** Per-unit selling price (B2C: `Partnumber._price`) for event `value` on add/remove. */
export function ga4UnitSellingPrice(item: CartItemData): number {
  return item.price.amount ?? 0;
}

/**
 * Maps cart API `categories[]` (breadcrumb order: broad → narrow) to GA4 `item_category` / `item_category2` / `item_category3`,
 * lowercased like B2C `GA_label`.
 */
function ga4ItemCategoryFields(item: CartItemData): {
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
} {
  const normalized = (item.categories ?? [])
    .map((c) => (c ?? '').trim().toLowerCase())
    .filter(Boolean);

  const out: {
    item_category?: string;
    item_category2?: string;
    item_category3?: string;
  } = {};

  if (normalized[0]) out.item_category = normalized[0];
  if (normalized[1]) out.item_category2 = normalized[1];
  if (normalized[2]) out.item_category3 = normalized[2];

  return out;
}

/** GA4 [ecommerce items](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?client_type=gtag) shape for dataLayer. */
export type Ga4EcommerceItem = {
  discount?: number;
  index?: number;
  item_brand?: string;
  item_category?: string;
  item_category2?: string;
  item_category3?: string;
  item_id: string;
  item_name: string;
  item_variant?: string;
  price?: number;
  quantity?: number;
};

export function mapCartItemToGa4Item(
  item: CartItemData,
  index: number,
  quantityOverride?: number,
): Ga4EcommerceItem {
  const qty = quantityOverride ?? item.quantity ?? 1;
  const variant = itemVariantFromAttributes(item.attributes);
  return {
    discount: ga4UnitDiscount(item),
    index,
    item_brand: resolveGa4ItemBrand(),
    ...ga4ItemCategoryFields(item),
    item_id: ga4ItemIdFromCartItem(item),
    item_name: item.name.toLowerCase(),
    ...(variant ? { item_variant: variant } : {}),
    price: ga4UnitListPrice(item),
    quantity: qty,
  };
}

export function buildEcommercePayloadFromCart(cart: CartData): {
  currency: string;
  items: Ga4EcommerceItem[];
  value: number;
} {
  return {
    currency: normalizeGa4Currency(cart.total.currency),
    items: cart.items.map((item, index) => mapCartItemToGa4Item(item, index)),
    value: cart.total.total ?? 0,
  };
}
