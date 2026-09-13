import assert from 'node:assert/strict';
import { coloringRewardPages, coloringRewardUpdate } from '../src/coloringRewards.js';

let data = { coloringRewards: [], coloringCompletedBooks: [] };
let carrots = 0;
let gold = 0;
// Interleave books to ensure a combined total never completes either book early.
const order = coloringRewardPages.abc.slice(0, 20).map((id) => [id, 'abc'])
  .concat([...coloringRewardPages['waffles-pip']].reverse().map((id) => [id, 'waffles-pip']))
  .concat(coloringRewardPages.abc.slice(20).map((id) => [id, 'abc']));
for (const [page, book] of order) {
  const reward = coloringRewardUpdate(data, page, book);
  carrots++;
  if (reward.completedBook) gold++;
  data = { coloringRewards: reward.nextRewards, coloringCompletedBooks: reward.completedBooks };
  assert.equal(coloringRewardUpdate(data, page, book), null, 'Repeat page must not pay again');
  assert.equal(gold, carrots < 30 ? 0 : carrots < 36 ? 1 : 2);
}
assert.equal(carrots, 36);
assert.equal(gold, 2);
// Existing ABC completion flags must not block Waffles or pay ABC twice.
const legacy = { coloringRewards: coloringRewardPages.abc.slice(0, 25), coloringBookGoldAwarded: true };
assert.equal(coloringRewardUpdate(legacy, 'Z').completedBook, false);
const legacyWithWaffles = { ...legacy, coloringRewards: [...legacy.coloringRewards, ...coloringRewardPages['waffles-pip'].slice(0, 9)] };
assert.equal(coloringRewardUpdate(legacyWithWaffles, 'waffles-pip-10', 'waffles-pip').completedBook, true);
assert.throws(() => coloringRewardUpdate({}, 'waffles-pip-1', 'abc'));
assert.throws(() => coloringRewardUpdate({}, 'waffles-pip-11', 'waffles-pip'));
console.log('Passed: both books, mixed order, duplicate rewards, legacy ABC completion, invalid pages.');
