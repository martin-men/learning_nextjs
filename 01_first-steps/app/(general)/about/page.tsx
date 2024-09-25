/* To let TS help us know which are all the available meta tags */
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About page',
  description: 'Description of the about page'
};

export default function AboutPage() {
  return (
    <span className="text-7xl">About page</span>
  )
}
