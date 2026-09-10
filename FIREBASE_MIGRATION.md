# Shared Grandma backend

The website and Android app now use `grandmas-rabbit-hole` for Firebase Authentication and the default Firestore database.

The completed transfer copied 17 documents from `toddler-coloring-book-1973`, including child profiles and their transaction subcollections. All 167 existing Grandma documents and all 4 original Grandma accounts were verified unchanged. One missing parent account was imported with its original UID and password hash, bringing Grandma to 5 accounts and 184 documents at verification.

For the two overlapping parent emails, the existing Grandma account and password were retained. Source child documents were copied under that account's UID. Child profiles with matching names remain separate profiles; balances were not combined.

The original website at https://toddler-coloring-book-1973.web.app was rebuilt and published using the Grandma backend. Its Hosting project remains `toddler-coloring-book-1973`; Hosting and the data backend are independent. Deploy future database rules explicitly to `grandmas-rabbit-hole`.

Android assets were rebuilt and synced, and `android/app/build/outputs/apk/debug/app-debug.apk` was built and inspected for the Grandma project ID. Install the updated APK or rebuild/run through Android Studio. Existing installed versions and already-open website tabs need to be updated/reloaded. Actual parent password sign-in was not exercised.

Private before/after snapshots, source password hash parameters, and the UID mapping are stored in the git-ignored `.firebase-migration/` directory. Treat these files as sensitive backups. The source project was not deleted. This was a one-time copy, not ongoing synchronization; progress saved later through an old app against the source project does not automatically transfer.

`scripts/firebase-migration.cjs` audits by default. Its apply mode preserves destination data and stops if a destination document differs; do not rerun it to merge newer progress. `scripts/verify-grandma-backend.cjs` checks live rules and compares existing accounts across the saved snapshots.
