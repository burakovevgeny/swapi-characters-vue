import { People } from '@/models';

export const paginateArray = (arr: People[], page: number, pageSize: number): People[] => {
  const since = (page - 1) * pageSize;
  return arr.slice(since, since + pageSize);
};

export const DOTS = '...';

export const paginationRange = (page: number, pageSize: number, total: number): (string | number)[] | undefined => {
  const siblingCount = 1;

  const totalPageCount = Math.ceil(total / pageSize);

  const totalPageNumbers = siblingCount + 5;

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_: undefined, idx) => idx + start);
  };

  if (totalPageNumbers >= totalPageCount) {
    return range(1, totalPageCount);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPageCount;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, totalPageCount];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};
