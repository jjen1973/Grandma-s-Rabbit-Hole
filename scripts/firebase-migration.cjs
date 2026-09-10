// Private snapshots contain personal data and password hashes. Never commit them.
const fs = require('node:fs');
const path = require('node:path');
const cli = process.env.FIREBASE_TOOLS_LIB;
if (!cli) throw new Error('Set FIREBASE_TOOLS_LIB to the installed firebase-tools/lib directory.');
const { getGlobalDefaultAccount } = require(path.join(cli, 'auth.js'));
const { requireAuth } = require(path.join(cli, 'requireAuth.js'));
const { Client } = require(path.join(cli, 'apiv2.js'));
const source = 'toddler-coloring-book-1973';
const target = 'grandmas-rabbit-hole';
const folder = path.resolve('.firebase-migration');
const { isDeepStrictEqual } = require('node:util');
const identity = new Client({ urlPrefix: 'https://identitytoolkit.googleapis.com' });
const firestore = new Client({ urlPrefix: 'https://firestore.googleapis.com' });
const root = p => `projects/${p}/databases/(default)/documents`;
async function users(project) {
  const result = [];
  let nextPageToken;
  do {
    const response = await identity.get(`/v1/projects/${project}/accounts:batchGet`, { queryParams: { maxResults: 1000, ...(nextPageToken ? { nextPageToken } : {}) } });
    result.push(...(response.body.users || []));
    nextPageToken = response.body.nextPageToken;
  } while (nextPageToken);
  return result;
}
async function documents(project) {
  const result = [];
  async function walk(parent) {
    let pageToken;
    do {
      const response = await firestore.post(`/v1/${parent}:listCollectionIds`, { pageSize: 100, ...(pageToken ? { pageToken } : {}) });
      for (const collection of response.body.collectionIds || []) {
        let docPage;
        do {
          const docs = await firestore.get(`/v1/${parent}/${encodeURIComponent(collection)}`, { queryParams: { pageSize: 300, showMissing: true, ...(docPage ? { pageToken: docPage } : {}) } });
          for (const doc of docs.body.documents || []) {
            if (doc.createTime) result.push(doc);
            await walk(doc.name);
          }
          docPage = docs.body.nextPageToken;
        } while (docPage);
      }
      pageToken = response.body.nextPageToken;
    } while (pageToken);
  }
  await walk(root(project));
  return result;
}
async function snapshot(project) {
  const [accounts, docs, config] = await Promise.all([
    users(project), documents(project), identity.get(`/admin/v2/projects/${project}/config`),
  ]);
  const data = { project, capturedAt: new Date().toISOString(), users: accounts, documents: docs, config: config.body };
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, `${project}-${Date.now()}.json`), JSON.stringify(data, null, 2), { mode: 0o600 });
  console.log(JSON.stringify({ project, users: accounts.length, documents: docs.length, passwordHashConfigAvailable: !!config.body.signIn?.hashConfig || !!config.body.signIn?.email?.hashConfig, emailEnabled: config.body.signIn?.email?.enabled }));
  return data;
}
async function main() {
  const account = getGlobalDefaultAccount();
  if (!account) throw new Error('Run firebase login first.');
  await requireAuth({ ...account, project: source, nonInteractive: true });
  const [a, b] = await Promise.all([snapshot(source), snapshot(target)]);
  const sameUid = a.users.filter(u => b.users.some(v => v.localId === u.localId));
  const emailCollision = a.users.filter(u => u.email && b.users.some(v => v.email?.toLowerCase() === u.email.toLowerCase() && v.localId !== u.localId));
  const paths = new Set(b.documents.map(d => d.name.replace(root(target), '')));
  const overlap = a.documents.filter(d => paths.has(d.name.replace(root(source), '')));
  console.log(JSON.stringify({ sameUid: sameUid.length, emailCollisions: emailCollision.length, overlappingDocumentPaths: overlap.length }));
  if (!process.argv.includes('--apply-keep-grandma-logins')) return;
  const uidMap = new Map();
  const additions = [];
  for (const u of a.users) {
    const existing = b.users.find(v => u.email && v.email?.toLowerCase() === u.email.toLowerCase());
    const uidMatch = b.users.find(v => v.localId === u.localId);
    if (uidMatch && uidMatch.email?.toLowerCase() !== u.email?.toLowerCase()) throw new Error('Conflicting UID; aborting.');
    if (existing || uidMatch) uidMap.set(u.localId, (existing || uidMatch).localId);
    else { uidMap.set(u.localId, u.localId); additions.push(u); }
  }
  const remapName = name => {
    if (!name.startsWith(root(source) + '/')) return name;
    const relative = name.slice(root(source).length + 1).split('/');
    if (relative[0] !== 'parents' || !uidMap.has(relative[1])) throw new Error('Unexpected document ownership; aborting.');
    relative[1] = uidMap.get(relative[1]);
    return `${root(target)}/${relative.join('/')}`;
  };
  const remapFields = value => {
    if (Array.isArray(value)) return value.map(remapFields);
    if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'referenceValue' ? remapName(v) : remapFields(v)]));
    return value;
  };
  const desired = a.documents.map(d => ({ name: remapName(d.name), fields: remapFields(d.fields || {}) }));
  const writes = [];
  for (const d of desired) {
    const existing = b.documents.find(v => v.name === d.name);
    if (existing && !isDeepStrictEqual(existing.fields || {}, d.fields)) throw new Error('Different data at a destination path; aborting without overwriting.');
    if (!existing) writes.push({ update: d, currentDocument: { exists: false } });
  }
  if (!b.config.signIn?.email?.enabled) throw new Error('Destination email login is disabled.');
  const hash = a.config.signIn?.hashConfig || a.config.signIn?.email?.hashConfig;
  if (additions.some(u => u.passwordHash) && (!hash?.signerKey || hash.algorithm !== 'SCRYPT')) throw new Error('Source password hash configuration unavailable or unsupported.');
  if (writes.length > 400 || additions.length > 1000) throw new Error('Migration exceeds this script’s reviewed batch size.');
  // Recheck the source immediately before applying to catch progress saved during the audit.
  const latestSource = await documents(source);
  const canonical = docs => docs.map(d => ({name:d.name, fields:d.fields || {}, updateTime:d.updateTime})).sort((x,y)=>x.name.localeCompare(y.name));
  if (!isDeepStrictEqual(canonical(latestSource), canonical(a.documents))) throw new Error('Source data changed during audit. Run again before switching clients.');
  if (additions.length) {
    const allowed = ['localId','email','emailVerified','passwordHash','salt','displayName','photoUrl','createdAt','lastLoginAt','phoneNumber','disabled','customAttributes','providerUserInfo','mfaInfo'];
    const imported = await identity.post(`/v1/projects/${target}/accounts:batchCreate`, {
      users: additions.map(u => {
        const importedUser = Object.fromEntries(allowed.filter(k => u[k] !== undefined).map(k => [k,u[k]]));
        // Password credentials come from passwordHash/salt, not a federated provider entry.
        if (importedUser.providerUserInfo) importedUser.providerUserInfo = importedUser.providerUserInfo.filter(p => p.providerId !== 'password');
        return importedUser;
      }),
      hashAlgorithm: hash.algorithm, signerKey: hash.signerKey, saltSeparator: hash.saltSeparator,
      rounds: hash.rounds, memoryCost: hash.memoryCost, sanityCheck: true, allowOverwrite: false,
    });
    if (imported.body.error?.length) throw new Error('Account import reported errors; no documents copied. Inspect Firebase accounts before retrying.');
  }
  if (writes.length) await firestore.post(`/v1/projects/${target}/databases/(default)/documents:commit`, { writes });
  const verified = await snapshot(target);
  for (const d of desired) {
    const actual = verified.documents.find(v => v.name === d.name);
    if (!actual || !isDeepStrictEqual(actual.fields || {}, d.fields)) throw new Error('Document verification failed.');
  }
  for (const u of a.users) {
    const actual = verified.users.find(v => v.localId === uidMap.get(u.localId));
    if (!actual || actual.email?.toLowerCase() !== u.email?.toLowerCase()) throw new Error('Account verification failed.');
  }
  for (const d of b.documents) {
    const actual = verified.documents.find(v => v.name === d.name);
    if (!actual || !isDeepStrictEqual(actual.fields || {}, d.fields)) throw new Error('Existing Grandma document changed during migration.');
  }
  fs.writeFileSync(path.join(folder, 'verified-migration.json'), JSON.stringify({ verifiedAt: new Date().toISOString(), source, target, importedAccounts: additions.length, copiedDocuments: writes.length, uidMap: Object.fromEntries(uidMap) }, null, 2), { mode: 0o600 });
  console.log(JSON.stringify({ verified: true, importedAccounts: additions.length, copiedDocuments: writes.length, existingGrandmaDocumentsPreserved: b.documents.length }));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
