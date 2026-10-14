import { Metadata } from 'next';
import { SPECIALIZED_SOLUTIONS } from '@/lib/toolsConfig';
import SpecializedSolutionView from '@/components/SpecializedSolutionView';

const solution = SPECIALIZED_SOLUTIONS.find((s) => s.id === 'compress-pdf-for-us-visa')!;

export const metadata: Metadata = {
  title: solution.seoTitle,
  description: solution.seoDescription,
  keywords: solution.keywords,
  alternates: {
    canonical: `https://pdfarenaarc.com/${solution.slug}/`,
  },
  openGraph: {
    title: solution.seoTitle,
    description: solution.seoDescription,
    url: `https://pdfarenaarc.com/${solution.slug}/`,
  },
};

export default function CompressPdfForUsVisaPage() {
  return <SpecializedSolutionView solution={solution} type="compress" />;
}
