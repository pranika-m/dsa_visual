import bubbleSort from './bubble-sort';
import selectionSort from './selection-sort';
import mergeSort from './merge-sort';
import quickSort from './quick-sort';
import linearSearch from './linear-search';
import binarySearch from './binary-search';
import singlyLinkedList from './singly-linked-list';
import doublyLinkedList from './doubly-linked-list';
import binarySearchTree from './binary-search-tree';
import stack from './stack';
import queue from './queue';
import bfs from './bfs';
import dfs from './dfs';

/**
 * Maps slugs (both concept slugs and topic slugs) to content objects.
 * Each content object has: { slug, title, defaultArray, code, steps[] }
 */
const slugMap = {
  // ─── Topic slugs ─────────────────────────────────
  'bubble-sort': bubbleSort,
  'selection-sort': selectionSort,
  'merge-sort': mergeSort,
  'quick-sort': quickSort,
  'linear-search': linearSearch,
  'binary-search': binarySearch,
  'singly-linked-list': singlyLinkedList,
  'doubly-linked-list': doublyLinkedList,
  'binary-search-tree': binarySearchTree,
  'stack': stack,
  'queue': queue,
  'bfs': bfs,
  'dfs': dfs,

  // ─── Concept slugs (from DB) ────────────────────
  'bubble-sort-algorithm': bubbleSort,
  'basic-selection-sort': selectionSort,
  'basic-merge-sort': mergeSort,
  'basic-quick-sort': quickSort,
  'binary-search-algorithm': binarySearch,
  'singly-linked-list-operations': singlyLinkedList,
};

/**
 * Retrieve learning content for a given slug.
 * Tries exact match first, then falls back to a prefix match.
 */
export function getContentBySlug(slug) {
  if (!slug) return null;

  // Exact match
  if (slugMap[slug]) return slugMap[slug];

  // Fallback: strip common suffixes and try again
  const stripped = slug
    .replace(/-algorithm$/, '')
    .replace(/-operations$/, '')
    .replace(/^basic-/, '');
  if (slugMap[stripped]) return slugMap[stripped];

  return null;
}

/** All content objects as an array (e.g., for listing). */
export const allContent = [
  bubbleSort,
  selectionSort,
  mergeSort,
  quickSort,
  linearSearch,
  binarySearch,
  singlyLinkedList,
  doublyLinkedList,
  binarySearchTree,
  stack,
  queue,
  bfs,
  dfs,
];

export default slugMap;
