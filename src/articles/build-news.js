#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const config = require('./config.js');

const articlesDir = path.join(__dirname, 'data');
const outputFile = path.join(__dirname, '../scripts/news-data.js');

function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Front Matterが見つかりません');
  }

  const frontMatterText = match[1];
  const bodyContent = match[2];
  const frontMatter = {};

  // Front Matterを解析
  frontMatterText.split('\n').forEach(line => {
    line = line.trim();
    if (!line) return;

    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.substring(0, colonIndex).trim();
    let value = line.substring(colonIndex + 1).trim();

    // 引用符を削除
    if ((value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // 配列の処理
    if (value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
        } catch (e) {
          console.warn(`配列の解析に失敗: ${line}`);
          }
        }

        // ブール値の処理
        if (value === 'true') value = true;
        if (value === 'false') value = false;

        frontMatter[key] = value;
      });

      return { frontMatter, bodyContent };
    }

    function extractExcerpt(bodyContent, maxLength = 150) {
      // Markdownから本文を抽出
      const text = bodyContent
      .replace(/^#+ .+$/gm, '')  // ヘッダーを除去
      .replace(/```[\s\S]*?```/g, '') // コードブロックを除去
      .replace(/`[^`]+`/g, '') // インラインコードを除去
      .replace(/\*\*([^*]+)\*\*/g, '$1') // 太字を除去
      .replace(/\*([^*]+)\*/g, '$1') // イタリックを除去
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // リンクを除去
      .replace(/^\s*[-*+]\s+/gm, '') // リスト記号を除去
      .replace(/\n+/g, ' ') // 改行をスペースに
      .trim();

      return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
    }

    function convertMarkdownToBasicHtml(markdown) {
      return markdown
      // ヘッダー
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')

      // コードブロック
      .replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, lang, code) {
        return `<pre><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
          })
          .replace(/`([^`]+)`/g, '<code>$1</code>')

          // 太字・イタリック
          .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          .replace(/\*([^*]+)\*/g, '<em>$1</em>')

          // リンク
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

          // 区切り線
          .replace(/^---$/gm, '<hr>')

          // リスト（複数行処理）
          .replace(/^- (.+)$/gm, '<li>$1</li>')
          .replace(/((<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>')

          // 段落処理（改行を適切に処理）
          .split('\n\n')
          .map(paragraph => {
            paragraph = paragraph.trim();
            if (!paragraph) return '';

            // 既にHTMLタグで囲まれている場合はそのまま
            if (paragraph.match(/^<(h[1-6]|ul|pre|hr)/)) {
              return paragraph;
            }

            // 通常の段落として処理
            return `<p>${paragraph.replace(/\n/g, '<br>')}</p>`;
              })
              .filter(p => p)
              .join('\n\n');
            }

            function main() {
              console.log('📚 記事データを収集しています...');

              try {
                const articles = [];

                if (!fs.existsSync(articlesDir)) {
                  console.error('❌ 記事ディレクトリが見つかりません:', articlesDir);
                  return;
                }

                const files = fs.readdirSync(articlesDir)
                .filter(file => file.endsWith('.md'))
                .sort(); // ファイル名でソート

                for (const file of files) {
                  const filePath = path.join(articlesDir, file);

                  try {
                    console.log(`📖 処理中: ${file}`);

                      const content = fs.readFileSync(filePath, 'utf8');
                      const { frontMatter, bodyContent } = parseFrontMatter(content);

                        // 必須フィールドチェック
                        const basicRequiredFields = ['title', 'date', 'category']; // 基本的な必須フィールド
                        for (const field of basicRequiredFields) {
                          if (!frontMatter[field]) {
                            throw new Error(`必須フィールド '${field}' が不足しています`);
                            }
                          }

                          // Markdownを基本的なHTMLに変換
                          const htmlContent = convertMarkdownToBasicHtml(bodyContent.trim());

                          // デフォルト値設定
                          const article = {
                            id: path.basename(file, '.md'),
                            title: frontMatter.title,
                            date: frontMatter.date,
                            category: frontMatter.category,
                            tags: frontMatter.tags || [],
                            author: frontMatter.author || 'Nyayuta',
                            excerpt: frontMatter.excerpt || extractExcerpt(bodyContent),
                            content: bodyContent.trim(), // 元のMarkdown
                            contentHtml: htmlContent, // HTML変換版
                            readTime: frontMatter.readTime || config.metadata.defaultReadTime,
                            featured: frontMatter.featured || config.metadata.defaultFeatured,
                            url: `/articles/${path.basename(file, '.md')}.html`
                            };

                            articles.push(article);
                            console.log(`  ✅ ${article.title}`);

                              } catch (error) {
                                console.error(`  ❌ ${file}: ${error.message}`);
                                }
                              }

                              // 日付順でソート（新しい順）
                              articles.sort((a, b) => new Date(b.date) - new Date(a.date));

                              // 設定ファイルからカテゴリを取得
                              const categories = config.metadata.categories;

                              const template = `// 記事データ（自動生成 - ${new Date().toLocaleString('ja-JP')}）
                                const newsData = ${JSON.stringify(articles, null, 4)};

                                const categories = ${JSON.stringify(categories, null, 4)};

                                // ヘルパー関数
                                function formatDate(dateString) {
                                  const date = new Date(dateString);
                                  return date.toLocaleDateString('ja-JP', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit'
                                    }).replace(/\\//g, '.');
                                  }

                                  function filterByCategory(category) {
                                    if (category === 'all') return newsData;
                                    return newsData.filter(article => article.category === category);
                                  }

                                  function searchArticles(keyword) {
                                    const lowercaseKeyword = keyword.toLowerCase();
                                    return newsData.filter(article =>
                                    article.title.toLowerCase().includes(lowercaseKeyword) ||
                                    article.excerpt.toLowerCase().includes(lowercaseKeyword) ||
                                    article.tags.some(tag => tag.toLowerCase().includes(lowercaseKeyword))
                                    );
                                  }

                                  function getLatestArticles(count = 3) {
                                    return newsData.slice(0, count);
                                  }

                                  function getFeaturedArticles() {
                                    return newsData.filter(article => article.featured);
                                  }

                                  function getArticlesByCategory(category) {
                                    return newsData.filter(article => article.category === category);
                                  }

                                  function getThisMonthCount() {
                                    const currentMonth = new Date().getMonth();
                                    const currentYear = new Date().getFullYear();

                                    return newsData.filter(article => {
                                      const articleDate = new Date(article.date);
                                      return articleDate.getMonth() === currentMonth &&
                                      articleDate.getFullYear() === currentYear;
                                      }).length;
                                    }

                                    function getArticleById(id) {
                                      return newsData.find(article => article.id === id);
                                    }

                                    // エクスポート（Node.jsとブラウザの両方に対応）
                                    if (typeof module !== 'undefined' && module.exports) {
                                      module.exports = {
                                        newsData, categories, formatDate, filterByCategory,
                                        searchArticles, getLatestArticles, getFeaturedArticles,
                                        getArticlesByCategory, getThisMonthCount, getArticleById
                                      };
                                      }`;

                                      // 出力ディレクトリを作成
                                      const outputDir = path.dirname(outputFile);
                                      if (!fs.existsSync(outputDir)) {
                                        fs.mkdirSync(outputDir, { recursive: true });
                                        }

                                        fs.writeFileSync(outputFile, template, 'utf8');

                                        console.log(`\n🎉 生成完了！`);
                                        console.log(`📊 処理された記事: ${articles.length}件`);
                                          console.log(`📁 出力ファイル: ${outputFile}`);
                                            console.log(`\n最新の記事:`);

                                            articles.slice(0, 3).forEach((article, index) => {
                                              console.log(`  ${index + 1}. ${article.title} (${article.date})`);
                                              });

                                              } catch (error) {
                                                console.error('❌ エラー:', error.message);
                                                process.exit(1);
                                              }
                                            }

                                            if (require.main === module) {
                                              main();
                                            }