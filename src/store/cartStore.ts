import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductVariant, CartItem } from "@/types";

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, delta: number) => void;
  getItemQuantity: (productId: string, variantId: string) => number;
  clearCart: () => void;
  totalItems: () => number;
  subtotal: () => number;
  discount: () => number;
  deliveryFee: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, variant) => {
        set((state) => {
          const index = state.items.findIndex(
            (i) => i.productId === product.id && i.variantId === variant.id
          );
          if (index > -1) {
            const updated = [...state.items];
            updated[index].quantity += 1;
            return { items: updated };
          }
          return {
            items: [
              ...state.items,
              {
                productId: product.id,
                variantId: variant.id,
                product,
                variant,
                quantity: 1,
              },
            ],
          };
        });
      },

      removeItem: (productId, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.variantId === variantId)
          ),
        }));
      },

      updateQuantity: (productId, variantId, delta) => {
        set((state) => {
          const updated = state.items
            .map((item) => {
              if (item.productId === productId && item.variantId === variantId) {
                const nextQty = item.quantity + delta;
                return nextQty > 0 ? { ...item, quantity: nextQty } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { items: updated };
        });
      },

      getItemQuantity: (productId, variantId) => {
        const item = get().items.find(
          (i) => i.productId === productId && i.variantId === variantId
        );
        return item ? item.quantity : 0;
      },

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce(
          (sum, item) => sum + item.variant.mrp * item.quantity,
          0
        ),

      discount: () =>
        get().items.reduce(
          (sum, item) =>
            sum + (item.variant.mrp - item.variant.price) * item.quantity,
          0
        ),

      deliveryFee: () => {
        const netGoods = get().subtotal() - get().discount();
        if (netGoods === 0) return 0;
        // Free delivery on orders over ₹200
        return netGoods >= 200 ? 0 : 30;
      },

      total: () => {
        const netGoods = get().subtotal() - get().discount();
        if (netGoods === 0) return 0;
        return netGoods + get().deliveryFee();
      },
    }),
    {
      name: "jivan-supermarket-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
