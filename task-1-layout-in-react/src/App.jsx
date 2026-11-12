import { useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import './App.css'

// Import the original article as text.
// The "?raw" option tells Vite to read the Markdown file without changing it.
import articleText from './assets/text-content.md?raw'

// Import the images so Vite can include them correctly in the website.
import logo from './assets/logo.svg'
import allEncores from './assets/all-encores.jpg'
import articulation from './assets/articulation.jpg'
import blurred from './assets/blurred.jpg'
import encoresTwo from './assets/encores-2.jpg'
import eulogy from './assets/eulogy-for-evolution.jpg'
import profilePicture from './assets/profile_picture.jpg'
import facebookIcon from './assets/facebook-icon.png'
import instagramIcon from './assets/instagram-icon.svg'
import twitterIcon from './assets/twitter-icon.svg'

// The header is a separate functional component.
// Flexbox will arrange the logo and navigation in App.css.
function Header() {
  return (
    <header className="site-header">
      <img src={logo} alt="Erased Tapes logo" className="site-logo" />

      <nav aria-label="Main navigation">
        <a href="#blog">Our Blog</a>
        <a href="#gallery">Our Artists</a>
        <a href="#about">Our Story</a>
      </nav>
    </header>
  )
}

// Store gallery images in an array to avoid repeating JSX.
// CSS Grid will control their positions on the page.
const galleryImages = [
  { src: allEncores, alt: 'All Encores album artwork' },
  { src: articulation, alt: 'Articulation album artwork' },
  { src: blurred, alt: 'Blurred album artwork' },
  { src: encoresTwo, alt: 'Encores 2 album artwork' },
  { src: eulogy, alt: 'Eulogy for Evolution album artwork' },
]

// The gallery displays one large image and four smaller images.
function Gallery() {
  return (
    <section id="gallery" className="gallery" aria-label="Album gallery">
      {galleryImages.map((image, index) => (
        <img
          key={image.src}
          src={image.src}
          alt={image.alt}
          className={index === 0 ? 'gallery-featured' : 'gallery-small'}
        />
      ))}
    </section>
  )
}

// Social links are grouped in a reusable component.
// The icons come from the original assessment assets.
function SocialLinks() {
  return (
    <div className="social-links" aria-label="Social media">
      <a href="https://www.facebook.com/" aria-label="Facebook">
        <img src={facebookIcon} alt="" />
      </a>
      <a href="https://www.instagram.com/" aria-label="Instagram">
        <img src={instagramIcon} alt="" />
      </a>
      <a href="https://twitter.com/" aria-label="Twitter">
        <img src={twitterIcon} alt="" />
      </a>
    </div>
  )
}

// The author section uses the original photograph and biography.
function Author({ biography }) {
  return (
    <section id="about" className="author-section">
      <div className="author-information">
        <h2>The Author</h2>
        <ReactMarkdown>{biography}</ReactMarkdown>
        <SocialLinks />
      </div>

      <img
        src={profilePicture}
        alt="Portrait of the article author"
        className="author-photo"
      />
    </section>
  )
}

// Each comment is displayed with the original name and message.
function Comments({ comments }) {
  return (
    <section id="comments" className="comments-section">
      <h2>Comments</h2>
      <ReactMarkdown>{comments}</ReactMarkdown>
    </section>
  )
}

// The footer is a separate functional component.
function Footer() {
  return (
    <footer id="footer" className="site-footer">
      <nav aria-label="Footer navigation">
        <a href="#blog">Our Blog</a>
        <a href="#gallery">Our Artists</a>
        <a href="#about">Our Story</a>
      </nav>

      <SocialLinks />
    </footer>
  )
}

// Separate the supplied Markdown into article, author and comments.
// This keeps all original paragraphs instead of rewriting them.
function splitContent(markdown) {
  const authorHeading = '## The Author'
  const commentsHeading = '## Comments'

  const authorPosition = markdown.indexOf(authorHeading)
  const commentsPosition = markdown.indexOf(commentsHeading)

  if (authorPosition === -1 || commentsPosition === -1) {
    return {
      article: markdown,
      biography: '',
      comments: '',
    }
  }

  const article = markdown.slice(0, authorPosition).trim()
  const authorContent = markdown
    .slice(authorPosition + authorHeading.length, commentsPosition)
    .trim()

  // Remove the copyright line from the author biography.
  const biography = authorContent
    .replace(/Copyright © 2023 Erased Disks Ltd\./g, '')
    .trim()

  const comments = markdown
    .slice(commentsPosition + commentsHeading.length)
    .trim()

  return { article, biography, comments }
}

// App combines all sections into the complete page structure.
function App() {
  const content = useMemo(() => splitContent(articleText), [])

  return (
    <>
      <Header />

      <main id="blog" className="blog-container">
        <article className="blog-article">
          <ReactMarkdown>{content.article}</ReactMarkdown>
        </article>

        <Gallery />

        <Author biography={content.biography} />

        <Comments comments={content.comments} />
      </main>

      <Footer />
    </>
  )
}

export default App