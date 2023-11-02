import type { CollectionEntry } from "astro:content";

interface SortOptions {
  filterDrafts?: boolean;
  filterNonPublished?: boolean;
  filterFurutePosts?: boolean;
  sortByDate?: boolean;
  randomize?: boolean;
  limit?: number;
}

/**
 * Ordena y filtra una colección de publicaciones.
 * @param posts - La colección de publicaciones a ordenar y filtrar.
 * @param options - Opciones de orden y filtrado (opcional). Si no se proporciona, se utilizan los valores por defecto:
 *   - filterDrafts: true
 *   - filterFurutePosts: true
 *   - sortByDate: true
 *   - randomize: false
 *   - limit: undefined
 * @returns La colección de publicaciones ordenada y filtrada.
 */
export function sortPosts(
  posts: CollectionEntry<"blog">[],
  options?: SortOptions
) {
  const {
    filterDrafts,
    filterNonPublished,
    filterFurutePosts,
    sortByDate,
    randomize,
    limit,
  } = {
    // Default sorting values
    ...{
      filterDrafts: true,
      filterNonPublished: true,
      filterFurutePosts: true,
      sortByDate: true,
      randomize: false,
    },
    ...options,
  };

  // Filters
  const filteredPosts = posts.reduce((acc: CollectionEntry<"blog">[], post) => {
    const { date: date, draft, published } = post.data;

    // Drafts
    if (filterDrafts && draft) return acc;

    // Future posts
    if (filterFurutePosts && new Date(date) > new Date()) return acc;

    // NonPublished
    if (filterNonPublished && !published) return acc;

    acc.push(post);

    return acc;
  }, []);

  // Sort Date
  if (sortByDate) {
    filteredPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  } else if (!sortByDate && randomize) {
    filteredPosts.sort(() => Math.random() - 0.5);
  }

  // Limit
  if (limit) {
    return filteredPosts.slice(0, limit);
  }

  return filteredPosts;
}
