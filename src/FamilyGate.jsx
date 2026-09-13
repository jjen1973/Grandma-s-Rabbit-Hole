import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, doc, onSnapshot, orderBy, query, runTransaction, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { Capacitor } from '@capacitor/core';
import { coloringRewardUpdate } from './coloringRewards';

// Android serves bundled HTML directly; the website uses the public rewrite.
const privacyUrl = Capacitor.isNativePlatform() ? '/privacy.html' : '/privacy';

const errorMessage = (error) => ({
  'auth/email-already-in-use': 'That email already has an account. Please sign in.',
  'auth/invalid-credential': 'The email or password is incorrect.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/weak-password': 'Use a password with at least 6 characters.',
  'auth/operation-not-allowed': 'Email/password login is not enabled in Firebase.',
  'auth/too-many-requests': 'Too many attempts. Please wait a little while and try again.',
  'permission-denied': 'The Firestore security rules have not been published yet.',
}[error?.code] || error?.message || 'Something went wrong. Please try again.');

const writeCurrencyTransaction = (transaction, childReference, {
  type,
  currency,
  amount,
  reason,
  itemId,
  balanceBefore,
  balanceAfter,
}) => {
  const transactionReference = doc(collection(childReference, 'transactions'));
  transaction.set(transactionReference, {
    type,
    currency,
    amount,
    reason,
    ...(itemId ? { itemId } : {}),
    createdAt: serverTimestamp(),
    balanceBefore,
    balanceAfter,
  });
};

const currencyTrackingInitialization = (data) => (
  Object.prototype.hasOwnProperty.call(data, 'currencyTrackingStartedAt')
    ? {}
    : {
      currencyTrackingStartedAt: serverTimestamp(),
      currencyTrackingComplete: false,
      openingCarrotsBalance: data.carrots || 0,
      openingGoldCarrotsBalance: data.goldCarrots || 0,
      trackedCarrotsEarned: data.trackedCarrotsEarned || 0,
      trackedCarrotsSpent: data.trackedCarrotsSpent || 0,
      trackedGoldCarrotsEarned: data.trackedGoldCarrotsEarned || 0,
      trackedGoldCarrotsSpent: data.trackedGoldCarrotsSpent || 0,
    }
);

export default function FamilyGate({ children }) {
  const [user, setUser] = useState(null);
  const [checking, setChecking] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selected, setSelected] = useState(null);
  const [childName, setChildName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [rewardError, setRewardError] = useState('');
  const [copiedDeveloperId, setCopiedDeveloperId] = useState('');

  useEffect(() => onAuthStateChanged(auth, (nextUser) => {
    setUser(nextUser);
    setChecking(false);
    if (!nextUser) {
      setProfiles([]);
      setSelected(null);
    }
  }), []);

  useEffect(() => {
    if (!user) return undefined;
    const profilesQuery = query(collection(db, 'parents', user.uid, 'children'), orderBy('createdAt', 'asc'));
    return onSnapshot(profilesQuery, (snapshot) => {
      const nextProfiles = snapshot.docs.map((item) => ({
        id: item.id,
        carrots: 0,
        goldCarrots: 0,
        goldStars: 0,
        trackedCarrotsEarned: 0,
        trackedCarrotsSpent: 0,
        trackedGoldCarrotsEarned: 0,
        trackedGoldCarrotsSpent: 0,
        ...item.data(),
      }));
      const remembered = localStorage.getItem('selectedChild:' + user.uid);
      setProfiles(nextProfiles);
      setSelected((current) => nextProfiles.find((item) => item.id === current?.id)
        || nextProfiles.find((item) => item.id === remembered)
        || null);
    }, (nextError) => setError(errorMessage(nextError)));
  }, [user]);

  const chooseChild = (profile) => {
    localStorage.setItem('selectedChild:' + user.uid, profile.id);
    setSelected(profile);
  };

  const copyDeveloperId = async (label, value) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedDeveloperId(label);
      window.setTimeout(() => setCopiedDeveloperId((current) => (current === label ? '' : current)), 1800);
    } catch {
      setError('Could not copy that ID. Please select and copy it manually.');
    }
  };

  const submitAccount = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      if (registering) await createUserWithEmailAndPassword(auth, email.trim(), password);
      else await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (nextError) {
      setError(errorMessage(nextError));
    } finally {
      setBusy(false);
    }
  };

  const reportRewardError = (activity, nextError) => {
    const code = nextError?.code ? ` (${nextError.code})` : '';
    const message = `${activity} reward could not be saved: ${errorMessage(nextError)}${code}`;
    console.error(message, nextError);
    setRewardError(message);
  };

  const resetPassword = async () => {
    const parentEmail = email.trim();
    setError('');
    setNotice('');
    if (!parentEmail) {
      setError('Enter your parent email first, then tap Forgot password?');
      return;
    }
    setBusy(true);
    try {
      await sendPasswordResetEmail(auth, parentEmail);
      setNotice(`Password reset instructions were sent to ${parentEmail}. Check your inbox and spam folder.`);
    } catch (nextError) {
      setError(errorMessage(nextError));
    } finally {
      setBusy(false);
    }
  };

  const addChild = async (event) => {
    event.preventDefault();
    const name = childName.trim();
    if (!name) return;
    setBusy(true);
    setError('');
    try {
      const data = {
        name,
        carrots: 0,
        goldCarrots: 0,
        goldStars: 0,
        currencyTrackingStartedAt: serverTimestamp(),
        currencyTrackingComplete: true,
        openingCarrotsBalance: 0,
        openingGoldCarrotsBalance: 0,
        trackedCarrotsEarned: 0,
        trackedCarrotsSpent: 0,
        trackedGoldCarrotsEarned: 0,
        trackedGoldCarrotsSpent: 0,
        createdAt: serverTimestamp(),
      };
      const reference = await addDoc(collection(db, 'parents', user.uid, 'children'), data);
      chooseChild({ id: reference.id, ...data });
      setChildName('');
    } catch (nextError) {
      setError(errorMessage(nextError));
    } finally {
      setBusy(false);
    }
  };

  const awardColoringPage = async (letter, bookId = 'abc') => {
    if (!user || !selected || !letter) return;
    const childReference = doc(db, 'parents', user.uid, 'children', selected.id);
    setRewardError('');
    try {
      await runTransaction(db, async (transaction) => {
        const snapshot = await transaction.get(childReference);
        if (!snapshot.exists()) throw new Error('The selected child profile was not found in Firestore.');
        const data = snapshot.data();
        const reward = coloringRewardUpdate(data, letter, bookId);
        if (!reward) return;
        const { nextRewards, completedBook, completedBooks } = reward;
        const carrotsBefore = data.carrots || 0;
        const carrotsAfter = carrotsBefore + 1;
        const goldCarrotsBefore = data.goldCarrots || 0;
        const goldCarrotsAfter = goldCarrotsBefore + (completedBook ? 1 : 0);
        transaction.update(childReference, {
          ...currencyTrackingInitialization(data),
          coloringRewards: nextRewards,
          carrots: carrotsAfter,
          trackedCarrotsEarned: (data.trackedCarrotsEarned || 0) + 1,
          ...(completedBook ? {
            goldCarrots: goldCarrotsAfter,
            trackedGoldCarrotsEarned: (data.trackedGoldCarrotsEarned || 0) + 1,
            coloringCompletedBooks: completedBooks,
            ...(bookId === 'abc' ? { coloringBookGoldAwarded: true } : {}),
          } : {}),
        });
        writeCurrencyTransaction(transaction, childReference, {
          type: 'earn',
          currency: 'carrots',
          amount: 1,
          reason: 'coloring-page',
          itemId: letter,
          balanceBefore: carrotsBefore,
          balanceAfter: carrotsAfter,
        });
        if (completedBook) {
          writeCurrencyTransaction(transaction, childReference, {
            type: 'earn', currency: 'goldCarrots', amount: 1, reason: 'coloring-book-complete',
            itemId: bookId,
            balanceBefore: goldCarrotsBefore, balanceAfter: goldCarrotsAfter,
          });
        }
      });
    } catch (nextError) {
      reportRewardError(`Coloring page ${letter}`, nextError);
      throw nextError;
    }
  };

  const awardMemoryLevel = async (level, maxLevel) => {
    if (!user || !selected || !level) return;
    const childReference = doc(db, 'parents', user.uid, 'children', selected.id);
    setRewardError('');
    try {
      await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(childReference);
      if (!snapshot.exists()) throw new Error('The selected child profile was not found in Firestore.');
      const data = snapshot.data();
      const completed = Array.isArray(data.memoryCompletedLevels) ? data.memoryCompletedLevels : [];
      if (completed.includes(level)) return;
      const earnsGoldCarrot = level % 5 === 0;
      const carrotsBefore = data.carrots || 0;
      const carrotsAfter = carrotsBefore + 1;
      const goldCarrotsBefore = data.goldCarrots || 0;
      const goldCarrotsAfter = goldCarrotsBefore + (earnsGoldCarrot ? 1 : 0);
      transaction.update(childReference, {
        ...currencyTrackingInitialization(data),
        memoryCompletedLevels: [...completed, level],
        memoryUnlockedLevel: Math.min(maxLevel, Math.max(data.memoryUnlockedLevel || 1, level + 1)),
        carrots: carrotsAfter,
        trackedCarrotsEarned: (data.trackedCarrotsEarned || 0) + 1,
        ...(earnsGoldCarrot ? {
          goldCarrots: goldCarrotsAfter,
          trackedGoldCarrotsEarned: (data.trackedGoldCarrotsEarned || 0) + 1,
        } : {}),
      });
      writeCurrencyTransaction(transaction, childReference, {
        type: 'earn',
        currency: 'carrots',
        amount: 1,
        reason: 'memory-level',
        balanceBefore: carrotsBefore,
        balanceAfter: carrotsAfter,
      });
      if (earnsGoldCarrot) {
        writeCurrencyTransaction(transaction, childReference, {
          type: 'earn',
          currency: 'goldCarrots',
          amount: 1,
          reason: 'memory-level-milestone',
          balanceBefore: goldCarrotsBefore,
          balanceAfter: goldCarrotsAfter,
        });
      }
      });
    } catch (nextError) {
      reportRewardError(`Memory level ${level}`, nextError);
      throw nextError;
    }
  };

  const purchaseItem = async (itemId, carrotCost = 0, goldCost = 0) => {
    if (!user || !selected) return false;
    const childReference = doc(db, 'parents', user.uid, 'children', selected.id);
    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(childReference);
      if (!snapshot.exists()) throw new Error('Child profile was not found.');
      const data = snapshot.data();
      const owned = Array.isArray(data.ownedItems) ? data.ownedItems : [];
      if (owned.includes(itemId)) return;
      if ((data.carrots || 0) < carrotCost || (data.goldCarrots || 0) < goldCost) {
        throw new Error('Earn a few more carrots to buy this item.');
      }
      const carrotsBefore = data.carrots || 0;
      const carrotsAfter = carrotsBefore - carrotCost;
      const goldCarrotsBefore = data.goldCarrots || 0;
      const goldCarrotsAfter = goldCarrotsBefore - goldCost;
      transaction.update(childReference, {
        ...((carrotCost > 0 || goldCost > 0) ? currencyTrackingInitialization(data) : {}),
        ownedItems: [...owned, itemId],
        carrots: carrotsAfter,
        goldCarrots: goldCarrotsAfter,
        ...(carrotCost > 0 ? { trackedCarrotsSpent: (data.trackedCarrotsSpent || 0) + carrotCost } : {}),
        ...(goldCost > 0 ? { trackedGoldCarrotsSpent: (data.trackedGoldCarrotsSpent || 0) + goldCost } : {}),
      });
      if (carrotCost > 0) {
        writeCurrencyTransaction(transaction, childReference, {
          type: 'spend', currency: 'carrots', amount: carrotCost, reason: 'purchase-item', itemId,
          balanceBefore: carrotsBefore, balanceAfter: carrotsAfter,
        });
      }
      if (goldCost > 0) {
        writeCurrencyTransaction(transaction, childReference, {
          type: 'spend', currency: 'goldCarrots', amount: goldCost, reason: 'purchase-item', itemId,
          balanceBefore: goldCarrotsBefore, balanceAfter: goldCarrotsAfter,
        });
      }
    });
    return true;
  };

  const awardBallReadyCompletion = async () => {
    if (!user || !selected) return false;
    const childReference = doc(db, 'parents', user.uid, 'children', selected.id);
    await runTransaction(db, async (transaction) => {
      const snapshot = await transaction.get(childReference);
      if (!snapshot.exists()) return;
      const data = snapshot.data();
      if (data.ballReadyCompletionAwarded) return;
      const carrotsBefore = data.carrots || 0;
      const carrotsAfter = carrotsBefore + 5;
      const goldCarrotsBefore = data.goldCarrots || 0;
      const goldCarrotsAfter = goldCarrotsBefore + 1;
      transaction.update(childReference, {
        ...currencyTrackingInitialization(data),
        ballReadyCompletionAwarded: true,
        carrots: carrotsAfter,
        goldCarrots: goldCarrotsAfter,
        trackedCarrotsEarned: (data.trackedCarrotsEarned || 0) + 5,
        trackedGoldCarrotsEarned: (data.trackedGoldCarrotsEarned || 0) + 1,
      });
      writeCurrencyTransaction(transaction, childReference, {
        type: 'earn', currency: 'carrots', amount: 5, reason: 'ball-ready-complete',
        balanceBefore: carrotsBefore, balanceAfter: carrotsAfter,
      });
      writeCurrencyTransaction(transaction, childReference, {
        type: 'earn', currency: 'goldCarrots', amount: 1, reason: 'ball-ready-complete',
        balanceBefore: goldCarrotsBefore, balanceAfter: goldCarrotsAfter,
      });
    });
    return true;
  };

  if (checking) return <main className='family-gate'><p className='family-loading'>Opening your family account...</p></main>;

  if (!user) return (
    <main className='family-gate'>
      <section className='family-card'>
        <div className='family-mark' aria-hidden='true'>A B C</div>
        <h1>Parent sign {registering ? 'up' : 'in'}</h1>
        <p>Only parents need an email. Children have profiles inside the family account.</p>
        <p><a href={privacyUrl}>Privacy Policy</a></p>
        <form className='family-form' onSubmit={submitAccount}>
          <label>Parent email<input type='email' value={email} onChange={(event) => setEmail(event.target.value)} autoComplete='email' required /></label>
          <div className='family-password-field'>
            <label htmlFor='parent-password'>Password</label>
            <div className='family-password-control'>
              <input id='parent-password' type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={registering ? 'new-password' : 'current-password'} autoCapitalize='none' spellCheck={false} minLength='6' required />
              <button className='family-password-toggle' type='button' aria-label={showPassword ? 'Hide password' : 'Show password'} aria-controls='parent-password' title={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword((visible) => !visible)}>
                <svg width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
                  <path d='M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z' />
                  <circle cx='12' cy='12' r='3' />
                  {showPassword ? <path d='m3 3 18 18' /> : null}
                </svg>
              </button>
            </div>
          </div>
          {error ? <p className='family-error' role='alert'>{error}</p> : null}
          {notice ? <p className='family-success' role='status'>{notice}</p> : null}
          <button disabled={busy}>{busy ? 'Please wait...' : registering ? 'Create parent account' : 'Sign in'}</button>
        </form>
        {!registering ? (
          <button className='family-link family-link-secondary' type='button' disabled={busy} onClick={resetPassword}>
            Forgot password?
          </button>
        ) : null}
        <button className='family-link' type='button' onClick={() => { setRegistering(!registering); setShowPassword(false); setError(''); setNotice(''); }}>
          {registering ? 'Already registered? Sign in' : 'New family? Create a parent account'}
        </button>
      </section>
    </main>
  );

  if (!selected) return (
    <main className='family-gate'>
      <section className='family-card family-card-wide'>
        <h1>Who is playing?</h1>
        <p className='family-email'>Parent: {user.email}</p>
        <p><a href={privacyUrl}>Privacy Policy</a></p>
        {profiles.length ? <div className='child-grid'>{profiles.map((profile) => (
          <button className='child-choice' type='button' key={profile.id} onClick={() => chooseChild(profile)}>
            <strong>{profile.name}</strong>
            <small>
              <span aria-label={`${profile.carrots} carrots`}>🥕 {profile.carrots}</span>
              <span className='gold-carrot-balance' aria-label={`${profile.goldCarrots} gold carrots`}><span className='gold-carrot-icon' aria-hidden='true'>🥕</span> {profile.goldCarrots}</span>
              <span className='gold-star-balance' aria-label={`${profile.goldStars || 0} gold stars`}><span className='gold-star-icon' aria-hidden='true'>★</span> {profile.goldStars || 0}</span>
            </small>
          </button>
        ))}</div> : <p>Add your first child to begin.</p>}
        <form className='add-child-form' onSubmit={addChild}>
          <label>Child's first name<input value={childName} onChange={(event) => setChildName(event.target.value)} maxLength='30' required /></label>
          <button disabled={busy}>{busy ? 'Adding...' : 'Add child'}</button>
        </form>
        <details className='developer-info'>
          <summary>Account / Developer Info</summary>
          <p className='developer-info-note'>Firebase identifiers for account support and development.</p>
          <div className='developer-id-row'>
            <div>
              <strong>Parent Auth UID</strong>
              <code>{user.uid}</code>
            </div>
            <button type='button' onClick={() => copyDeveloperId('parent', user.uid)}>
              {copiedDeveloperId === 'parent' ? 'Copied!' : 'Copy ID'}
            </button>
          </div>
          {profiles.map((profile) => (
            <div className='developer-id-row' key={`developer-${profile.id}`}>
              <div>
                <strong>Child: {profile.name}</strong>
                <code>{profile.id}</code>
              </div>
              <button type='button' onClick={() => copyDeveloperId(profile.id, profile.id)}>
                {copiedDeveloperId === profile.id ? 'Copied!' : 'Copy ID'}
              </button>
            </div>
          ))}
        </details>
        {error ? <p className='family-error' role='alert'>{error}</p> : null}
        <button className='family-link' type='button' onClick={() => signOut(auth)}>Sign out</button>
      </section>
    </main>
  );

  return (
    <>
      <aside className='family-toolbar' aria-label='Family account'>
        <span className='family-player'>Playing as <strong>{selected.name}</strong></span>
        <span className='currency-pill' aria-label={`${selected.carrots} carrots`}>🥕 {selected.carrots}</span>
        <span className='currency-pill gold' aria-label={`${selected.goldCarrots} gold carrots`}><span className='gold-carrot-icon' aria-hidden='true'>🥕</span> {selected.goldCarrots}</span>
        <span className='currency-pill star' aria-label={`${selected.goldStars || 0} gold stars`}><span className='gold-star-icon' aria-hidden='true'>★</span> {selected.goldStars || 0}</span>
        <button type='button' onClick={() => { localStorage.removeItem('selectedChild:' + user.uid); setSelected(null); }}>Switch child</button>
        <button type='button' onClick={() => signOut(auth)}>Sign out</button>
      </aside>
      {rewardError ? (
        <div className='reward-error-banner' role='alert'>
          <span>{rewardError}</span>
          <button type='button' aria-label='Dismiss reward error' onClick={() => setRewardError('')}>×</button>
        </div>
      ) : null}
      {React.cloneElement(children, {
        family: { user, child: selected, awardColoringPage, awardMemoryLevel, purchaseItem, awardBallReadyCompletion },
      })}
    </>
  );
}
