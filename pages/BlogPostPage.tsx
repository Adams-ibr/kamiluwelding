// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import Breadcrumbs from '../components/Breadcrumbs';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useAdmin();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold">Post not found</h1>
          <Link to="/blog" className="text-brand-gold mt-4 inline-block">Back to Blog</Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
        <div className="pt-24 bg-brand-light dark:bg-gray-800">
            <div className="container mx-auto px-4">
                 <Breadcrumbs />
            </div>
        </div>
      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <article>
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-brand-blue dark:text-gray-100 mb-4">{post.title}</h1>
              <p className="text-gray-500 dark:text-gray-400">By {post.author} on {post.publishDate}</p>
            </header>
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-8 shadow-lg" />
            <div 
                className="prose lg:prose-xl max-w-none text-gray-700 dark:prose"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default BlogPostPage;