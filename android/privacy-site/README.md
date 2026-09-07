# Grandma's Rabbit Hole privacy site

Public policy: https://grandmas-rabbit-hole-privacy.vercel.app/privacy

Vercel project: `grandmas-rabbit-hole-privacy` in team `jjen`.

This directory publishes only the privacy policy. Automatic Git deployments are disconnected; publishing is manual from this directory.

## Updating the policy

Keep `index.html` here and `../../public/privacy.html` in sync. The latter is the web app's source policy and is copied into Android by Capacitor. Do not rely on edits only to generated Android assets.

From the main repository directory, run `npm run android:sync` to rebuild and copy web changes into Android. Rebuild and install the Android app to update a phone.

From this directory, run `npx vercel deploy --prod` to update the existing public site. On a new computer, sign in and run `npx vercel link --project grandmas-rabbit-hole-privacy --scope jjen` first. Keep automatic Git deployment disconnected so the full app is not deployed to this policy-only project.

Verify the public URL without signing in after deployment. Local `.vercel` settings and `.env` files are intentionally excluded from Git.
