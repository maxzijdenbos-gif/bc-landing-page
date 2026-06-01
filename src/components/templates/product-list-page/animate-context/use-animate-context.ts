import { createContext, useContext } from 'react';

interface ProductListAnimateContextProps {
  animationActivated: boolean;
}

export const ProductListAnimateContext =
  createContext<ProductListAnimateContextProps | null>(null);

export const useProductListAnimateContext = () => {
  const context = useContext(ProductListAnimateContext);

  if (context) return context;

  return { animationActivated: true };
};
