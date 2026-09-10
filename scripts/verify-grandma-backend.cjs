const fs = require('node:fs');
const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');
const cli = process.env.FIREBASE_TOOLS_LIB;
const { getGlobalDefaultAccount } = require(path.join(cli, 'auth.js'));
const { requireAuth } = require(path.join(cli, 'requireAuth.js'));
const { Client } = require(path.join(cli, 'apiv2.js'));
async function main() {
  await requireAuth({ ...getGlobalDefaultAccount(), project: 'grandmas-rabbit-hole', nonInteractive: true });
  const rules = new Client({ urlPrefix: 'https://firebaserules.googleapis.com' });
  const release = await rules.get('/v1/projects/grandmas-rabbit-hole/releases/cloud.firestore');
  const ruleset = await rules.get(`/v1/${release.body.rulesetName}`);
  fs.writeFileSync('.firebase-migration/grandma-live-rules.json', JSON.stringify(ruleset.body, null, 2));
  const normalize = text => text.replace(/\r\n/g, '\n').trim();
  const matches = ruleset.body.source.files.some(file => normalize(file.content) === normalize(fs.readFileSync('firestore.rules', 'utf8')));
  if (!matches) throw new Error('Live Grandma rules differ from local rules; review saved rules before deployment.');
  const files = fs.readdirSync('.firebase-migration').filter(f => /^grandmas-rabbit-hole-\d+\.json$/.test(f)).sort();
  const before = JSON.parse(fs.readFileSync(path.join('.firebase-migration', files[0])));
  const after = JSON.parse(fs.readFileSync(path.join('.firebase-migration', files.at(-1))));
  for (const u of before.users) {
    if (!isDeepStrictEqual(u, after.users.find(v => v.localId === u.localId))) throw new Error('Existing Grandma account differs from original backup.');
  }
  console.log(JSON.stringify({ liveRulesMatch: matches, originalGrandmaAccountsPreserved: before.users.length, totalAccounts: after.users.length }));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
