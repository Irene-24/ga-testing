declare global {
  interface Window {
    gtag: Gtag.Gtag;
  }
}

const checkWindow = () => typeof window !== "undefined" && window.gtag;

export const login = () => {};

export const signup = () => {};

export const viewItem = () => {};

interface ViewListArgs {
  revenueCenter: string;
  serviceType: string;
  items: {
    id: string;
    name: string;
    sellingPrice: number;
    itemClassId: string;
    itemClass: string;
    itemGroup: string;
  }[];
}

export const viewList = (args: ViewListArgs) => {
  if (!checkWindow()) {
    return;
  }
  window.gtag("event", "view_item_list", {
    currency: "NGN",
    item_list_id: `${args.revenueCenter.toLowerCase()}-${args.serviceType.toLowerCase()}`,
    item_list_name: `${args.revenueCenter} items in (${args.serviceType}) mode`,
    items: args.items.map((x) => ({
      item_id: x.id,
      item_name: x.name,
      price: x.sellingPrice,
      item_category: x.itemClass,
      item_category_2: x.itemClassId,
      item_category_3: x.itemGroup,
    })),
  });
};

export const addToCart = () => {};

export const removeFromCart = () => {};

export const beginCheckout = () => {};

export const search = () => {};

export const purchase = () => {};

export const addShippingInfo = () => {};
