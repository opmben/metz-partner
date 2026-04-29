import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Navigation } from '@/components/shared/Navigation'
import { Footer } from '@/components/shared/Footer'
import { projects } from '@/lib/data/projects'
import { ProjectPageContent } from './ProjectPageContent'
import { JsonLd } from '@/components/shared/JsonLd'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  const url = `https://metzundpartner.com/projekte/${project.slug}`
  return {
    title: `${project.name} — Metz & Partner`,
    description: project.shortDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${project.name} — Metz & Partner`,
      description: project.shortDescription,
      url,
      siteName: 'Metz & Partner',
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  const url = `https://metzundpartner.com/projekte/${project.slug}`

  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Startseite',
                item: 'https://metzundpartner.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Projekte',
                item: 'https://metzundpartner.com/projekte',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: project.name,
                item: url,
              },
            ],
          },
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.name,
            description: project.shortDescription,
            url,
            dateCreated: project.year,
            locationCreated: {
              '@type': 'Place',
              name: project.location,
            },
            creator: {
              '@type': 'Organization',
              name: 'Metz & Partner Webdesign',
              url: 'https://metzundpartner.com',
            },
          },
        ]}
      />
      <Navigation />
      <main>
        <ProjectPageContent project={project} />
      </main>
      <Footer />
    </>
  )
}
