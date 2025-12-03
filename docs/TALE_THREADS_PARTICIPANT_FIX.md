# Tale Threads Participant Count Fix

## Issue

The participant count was showing hardcoded demo participants (3 online) instead of actual active users.

## Changes Made

### 1. Updated Sample Data (`src/data/sampleChainSessions.ts`)

**Before**:
```typescript
participants: [
  { userId: 'demo-user', displayName: 'Dr. Moreau', ... },
  { userId: 'guest-1', displayName: 'Guest', ... },
  { userId: 'user-2', displayName: 'CodeWhisperer', ... },
],
```

**After**:
```typescript
participants: [
  // Participants are added dynamically when users join
],
```

### 2. Added Auto-Join Functionality (`src/hooks/useChainSession.ts`)

Added `joinSession` function to automatically add users as participants when they view a session:

```typescript
const joinSession = async (userId: string, displayName: string) => {
  if (!sessionId || !session) return;

  // Check if user is already a participant
  const isParticipant = session.participants.some(p => p.userId === userId);
  if (isParticipant) return;

  try {
    const sessionRef = doc(db, 'chainSessions', sessionId);
    
    await updateDoc(sessionRef, {
      participants: arrayUnion({
        userId,
        displayName,
        joinedAt: Timestamp.now(),
      }),
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error('Error joining session:', err);
    throw err;
  }
};
```

### 3. Updated UI Display (`src/pages/Chains.tsx`)

**Before**:
```typescript
<span className="text-slate-400">
  {session.participants.length} online
</span>
```

**After**:
```typescript
<span className="text-slate-400">
  {session.participants.length} {session.participants.length === 1 ? 'participant' : 'participants'}
</span>
```

Changes:
- Removed pulsing indicator (was misleading for "online" status)
- Changed text from "online" to "participant(s)"
- Added proper singular/plural handling

### 4. Auto-Join on View

Added effect to automatically join session when viewing:

```typescript
useEffect(() => {
  if (session && currentUser && joinSession) {
    const isParticipant = session.participants.some(p => p.userId === currentUser.uid);
    if (!isParticipant) {
      joinSession(currentUser.uid, currentUser.displayName || 'Anonymous');
    }
  }
}, [session, currentUser, joinSession]);
```

## How It Works Now

1. **Demo Sessions Start Empty**: Sample sessions have no hardcoded participants
2. **Auto-Join**: When a user views a session, they're automatically added as a participant
3. **Accurate Count**: Participant count shows actual users who have viewed/joined the session
4. **Clear Labeling**: Changed from "online" to "participants" for accuracy

## Benefits

✅ **No Fake Data**: No hardcoded demo participants
✅ **Accurate Counts**: Shows real participant numbers
✅ **Auto-Join**: Users automatically join when viewing
✅ **Clear Labels**: "participants" instead of misleading "online"
✅ **Proper Grammar**: Singular/plural handling

## Testing

To test:
1. Navigate to Tale Threads (Chains page)
2. View a session
3. Participant count should show "1 participant" (you)
4. Open in another browser/account
5. Count should increase to "2 participants"

## Future Enhancements

Potential improvements:
- **Active Status**: Track actual online/active status with presence system
- **Leave Session**: Allow users to leave sessions
- **Participant List**: Show who the participants are
- **Activity Indicators**: Show who's currently typing/active
- **Presence Timeout**: Remove inactive participants after timeout

## Related Files

- `src/hooks/useChainSession.ts` - Added joinSession function
- `src/pages/Chains.tsx` - Updated UI and added auto-join
- `src/data/sampleChainSessions.ts` - Removed hardcoded participants
- `src/config/taleThreads.ts` - Configuration for session settings

## Configuration

Session settings can be configured in `src/config/taleThreads.ts`:

```typescript
SESSION_CONFIG = {
  capacity: {
    min: 2,
    max: 8,
    default: 4,
  },
  presence: {
    heartbeatIntervalMs: 5000,
    inactiveThresholdMs: 30000,
  },
}
```

Use `useSessionCapacity` hook for capacity tracking:

```typescript
import { useSessionCapacity } from '../hooks/useTaleThreadsConfig';

const capacity = useSessionCapacity(session.participants.length, session.maxParticipants);
// capacity.current, capacity.max, capacity.isFull, etc.
```
