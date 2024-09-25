import type { Metadata } from "next";

export const metadata: Metadata = {
 title: 'Contact page',
 description: 'Description of the contact page'
};

export default function ContactPage() {
  return (
    <>
      <span className="text-5xl">Contact page</span>
    </>
  )
}