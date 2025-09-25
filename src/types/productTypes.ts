export interface ColorDetail {
  id: number;
  name: string;
  code: string;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: number;
  detailId: number;
  colorDetailId: number;
  name: string | null;
  price: number | null;
  salePrice: number | null;
  qty_in_stock: number | null;
  SKU: string | null;
  color_detail: ColorDetail;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: number;
  detailId: number;
  colorId: number; // Add colorId of type number
  path: string;
  altText: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  id: number;
  detailId: number;
  sizeId: number;
  price: number | null;
  salePrice: number | null;
  availabilityId: number | null;
  unitId: number | null;
  qty_in_stock: number | null;
  SKU: string | null;

  shoulder: string | null;
  sleeve_length: string | null;
  bust: string | null;
  hip: string | null;
  length: string | null;
  waist: string | null;

  unit: string | null;
  size: {
    id: number;
    value: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Details {
  id: number;
  productId: number;
  images: Image[];
  colors: Color[];
  sizes: Size[];
}

export interface ProductName {
  name: string;
  languageCode: string; // Updated to match the structure in data.json
}

export interface Organize {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Packgage {
  id: number;
  packgageId: number | null;
  name: string;
  inPackAmount: number;
  price: number;
  salePrice: number | null;
  productsSizeId: number | null;
}

export interface Classification {
  id: number;
  name: string;
}

export interface Badge {
  id: number;
  name: string;
  color: string;
  icon: string | null;
}

export interface Product {
  id: number;
  organizeId: string;
  imageCoverPath: string | null;
  productId: string;
  basePrice: number;
  salePrice: number;
  size: string;
  sizeUnitId: string;
  packgageId: string;
  inPackAmount: number; // Add inPackAmount field
  inPackAmountTypes: {
    name: string; // Add inPackAmountTypes with name field
  } | null;
  inPackAmountTypeId: string;
  stock: number | null;
  availabilityId: number;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  details: Details;
  productNames: ProductName[];
  organize: Organize; // Updated to support a single Organize object
  categories: Category[]; // Add categories field
  tags: Tag[]; // Add tags field
  packgages: Packgage[]; // Add packgages field
  sizeUnit: {
    unit: string; // Add sizeUnit with unit field
  } | null;
  classifications?: Classification[]; // Add classifications field as optional
  badge?: Badge; // Add badge field as optional
}

export interface PageCursor {
  page: number;
  cursor: number;
}

export interface ProductsResponse {
  totalCount: number | null;
  totalPage: number | null;
  pageCursor?: PageCursor[];
  products: Product[];
}

export interface UserFavorite {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  updatedAt: string;
  product: Product; // Relation to the Product model
}

export interface ShoppingProduct {
  id: number;
  cartId: number;
  productId: number;
  colorId: number | null;
  sizeId: number | null;
  packgageId: number | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: Product; // Relation to the Product model, updated to include sizeUnit
  color: Color | null; // Relation to the Color model
  size: {
    id: number;
    value: string;
    price: number | null;
    createdAt: string;
    updatedAt: string;
  } | null; // Update size to match the structure in data.json
}

export interface Cart {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  shoppingProducts: ShoppingProduct[]; // Array of shopping products
}

export interface AddOrUpdateCartItem {
  productId: number; // Ensure productId is strictly a number
  quantity: number; // Ensure quantity is strictly a number
  colors_colorDetailId?: number | null;
  sizes_sizeId?: number | null;
  packgageId?: number | null;
}