import type { Metadata } from "next";

export const metadata: Metadata = {
 title: 'Pricing page',
 description: 'Description of the pricing page'
};

export default function PricingPage() {
  return (
    <>
      <span className="text-5xl">Pricing page</span>
    </>
  )
}