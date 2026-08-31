import { MetadataRoute } from 'next'
import { getServerSideSitemap } from 'next-sitemap'

// If you have dynamic routes, fetch them from your CMS/API
async function getDynamicRoutes() {
  // Example: Fetch from your database or CMS
  // const posts = await fetch('https://api.yourcms.com/posts').then(res => res.json())
  // return posts.map((post: any) => ({
  //   url: `https://your-domain.com/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.8,
  // }))
  
  // Example static routes
  return [
    {
      url: 'https://www.zoytours.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: 'https://www.zoytours.com/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base routes
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: 'https://www.zoytours.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://www.zoytours.com/blog',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://www.zoytours.com/products',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // Get dynamic routes
  const dynamicRoutes = await getDynamicRoutes()

  return [...baseRoutes, ...dynamicRoutes]
}