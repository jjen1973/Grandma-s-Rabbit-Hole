export const coloringRewardPages = {
  abc: Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)),
  'waffles-pip': Array.from({ length: 10 }, (_, index) => `waffles-pip-${index + 1}`),
};

export function coloringRewardUpdate(data, pageId, bookId = 'abc') {
  const pages = coloringRewardPages[bookId];
  if (!pages?.includes(pageId)) throw new Error('Unknown coloring page.');
  const rewarded = Array.isArray(data.coloringRewards) ? data.coloringRewards : [];
  if (rewarded.includes(pageId)) return null;
  const nextRewards = [...rewarded, pageId];
  const completedBooks = Array.isArray(data.coloringCompletedBooks) ? data.coloringCompletedBooks : [];
  const alreadyCompleted = completedBooks.includes(bookId) || (bookId === 'abc' && data.coloringBookGoldAwarded);
  const completedBook = !alreadyCompleted && pages.every((id) => nextRewards.includes(id));
  return {
    nextRewards,
    completedBook,
    completedBooks: completedBook ? [...completedBooks, bookId] : completedBooks,
  };
}
