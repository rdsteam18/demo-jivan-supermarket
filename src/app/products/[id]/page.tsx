import { Metadata } from "next";
import { notFound } from "next/navigation";
import productsData from "@/data/products.json";
import { Product } from "@/types";
import ProductDetailClient from "@/components/products/ProductDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products: Product[] = productsData as Product[];
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const products: Product[] = productsData as Product[];
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | Jivan Supermarket",
      description: "The requested grocery product could not be found.",
    };
  }

  const minPrice = Math.min(...product.variants.map((v) => v.price));

  return {
    title: `${product.name} (from ₹${minPrice}) | Jivan Supermarket`,
    description: `${product.description} Delivered in 12 mins in New Maninagar from Jivan Supermarket.`,
    openGraph: {
      title: `${product.name} | Jivan Supermarket`,
      description: product.description,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const products: Product[] = productsData as Product[];
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} allProducts={products} />;
}
