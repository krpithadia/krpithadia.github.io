const fs = require('fs');
const path = require('path');

const DRAFTS_DIR = path.join(__dirname, '../_drafts');
const BLOG_DIR = path.join(__dirname, '../blog');
const INDEX_HTML = path.join(__dirname, '../index.html');
const BLOGS_HTML = path.join(__dirname, '../blogs.html');
const SITEMAP_XML = path.join(__dirname, '../sitemap.xml');

// Helper to format date YYYY-MM-DD to "Month DD, YYYY"
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
        year: 'numeric'
    });
}

function processDrafts() {
    if (!fs.existsSync(DRAFTS_DIR)) {
        console.log('No _drafts directory found.');
        return;
    }

    const files = fs.readdirSync(DRAFTS_DIR).filter(file => file.endsWith('.html'));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const file of files) {
        const filePath = path.join(DRAFTS_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');

        // Extract publish date
        const matchDate = content.match(/<meta[^>]*name=["']publish-date["'][^>]*content=["']([^"']+)["'][^>]*>/i);
        if (!matchDate) {
            console.log(`Skipping ${file}: No publish-date meta tag found.`);
            continue;
        }

        const publishDateStr = matchDate[1];
        const publishDate = new Date(publishDateStr);
        publishDate.setHours(0, 0, 0, 0);

        if (publishDate <= today) {
            console.log(`Publishing ${file}...`);

            // Extract metadata for the card
            const matchTitle = content.match(/<title>([^<]+)\|/i) || content.match(/<title>([^<]+)<\/title>/i);
            const title = matchTitle ? matchTitle[1].trim() : 'New Blog Post';

            const matchDesc = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i);
            const description = matchDesc ? matchDesc[1].trim() : '';

            const formattedDate = formatDate(publishDateStr);
            const blogUrl = `blog/${file}`;
            const absoluteUrl = `https://krpithadia.com/blog/${file}`;

            const blogCardHtml = `
                    <article class="blog-card">
                        <div class="blog-content">
                            <span class="blog-date">${formattedDate}</span>
                            <h3>${title}</h3>
                            <p>${description}</p>
                            <a href="${blogUrl}" class="read-more">Read Article &rarr;</a>
                        </div>
                    </article>
`;

            const sitemapUrlHtml = `  <url>
    <loc>${absoluteUrl}</loc>
    <lastmod>${publishDateStr}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;

            // 1. Move file to blog directory
            const destPath = path.join(BLOG_DIR, file);
            fs.copyFileSync(filePath, destPath);
            fs.unlinkSync(filePath);

            // 2. Update index.html
            let indexContent = fs.readFileSync(INDEX_HTML, 'utf-8');
            indexContent = indexContent.replace(
                /<div class="blog-grid">\s*/,
                `<div class="blog-grid">\n${blogCardHtml}`
            );
            fs.writeFileSync(INDEX_HTML, indexContent);

            // 3. Update blogs.html
            let blogsContent = fs.readFileSync(BLOGS_HTML, 'utf-8');
            blogsContent = blogsContent.replace(
                /<div class="blog-grid">\s*/,
                `<div class="blog-grid">\n${blogCardHtml}`
            );
            fs.writeFileSync(BLOGS_HTML, blogsContent);

            // 4. Update sitemap.xml
            let sitemapContent = fs.readFileSync(SITEMAP_XML, 'utf-8');
            sitemapContent = sitemapContent.replace(
                /<urlset[^>]*>\s*/,
                `$&${sitemapUrlHtml}`
            );
            fs.writeFileSync(SITEMAP_XML, sitemapContent);

            console.log(`Successfully published ${file}!`);
        } else {
            console.log(`Skipping ${file}: Scheduled for future date (${publishDateStr})`);
        }
    }
}

try {
    processDrafts();
} catch (error) {
    console.error('Error processing drafts:', error);
    process.exit(1);
}
