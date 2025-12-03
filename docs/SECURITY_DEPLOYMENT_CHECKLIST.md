# Security Deployment Checklist

## Pre-Deployment

### 1. Install Dependencies
```bash
npm install
```

Expected new packages:
- `dompurify` - HTML sanitization
- `@types/dompurify` - TypeScript types

### 2. Environment Configuration

Create/update `.env`:
```env
# Security Settings
VITE_ENABLE_RATE_LIMITING=true
VITE_ENABLE_SECURITY_LOGGING=true
VITE_MAX_REQUEST_SIZE=5242880

# Firebase (existing)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Test Locally

```bash
# Run tests
npm run test

# Type check
npm run type-check

# Build
npm run build

# Preview production build
npm run preview
```

### 4. Review Firestore Rules

Check `firestore.rules` for:
- [x] Enhanced validation helpers
- [x] XSS prevention
- [x] Rate limiting checks
- [x] Immutable field protection
- [x] Admin-only operations

### 5. Backup Current Rules

```bash
# Download current rules
firebase firestore:rules > firestore.rules.backup

# Save with timestamp
cp firestore.rules.backup "firestore.rules.backup.$(date +%Y%m%d_%H%M%S)"
```

## Deployment Steps

### Step 1: Deploy Firestore Rules

```bash
# Test rules locally (optional)
firebase emulators:start --only firestore

# Deploy rules
firebase deploy --only firestore:rules
```

**Expected output:**
```
✔  Deploy complete!
```

### Step 2: Deploy Application

```bash
# Build production
npm run build

# Deploy to hosting
firebase deploy --only hosting
```

### Step 3: Verify Deployment

1. **Test Authentication**
   - [ ] Login works
   - [ ] Signup works
   - [ ] Rate limiting triggers after 5 failed attempts
   - [ ] Password reset works

2. **Test Content Creation**
   - [ ] Forum post creation
   - [ ] Comment creation
   - [ ] Story creation
   - [ ] Diary entry creation
   - [ ] Rate limits trigger correctly

3. **Test Security Features**
   - [ ] XSS attempts blocked
   - [ ] SQL injection attempts blocked
   - [ ] Malformed data rejected
   - [ ] Unauthorized access denied

4. **Test Performance**
   - [ ] Page load times acceptable
   - [ ] No console errors
   - [ ] Caching working
   - [ ] Rate limit info displayed

## Post-Deployment

### 1. Monitor Firebase Console

Check for:
- [ ] Read/write operation counts
- [ ] Error rates
- [ ] Cost trends
- [ ] Security rule violations

### 2. Test Rate Limiting

```javascript
// In browser console
import { checkRateLimit } from './utils/rateLimiter';

// Test post creation limit
for (let i = 0; i < 15; i++) {
  const result = checkRateLimit(userId, 'POST_CREATE');
  console.log(`Attempt ${i + 1}:`, result.allowed, 'Remaining:', result.remaining);
}
```

### 3. Review Security Logs

```javascript
// In browser console
import { securityMonitor } from './utils/securityMonitor';

// Get stats
const stats = securityMonitor.getStats();
console.log('Security Stats:', stats);

// Export events
const events = securityMonitor.exportEvents();
console.log('Security Events:', events);
```

### 4. Set Up Monitoring Alerts

Configure Firebase alerts for:
- [ ] High read/write counts
- [ ] Error rate spikes
- [ ] Cost threshold exceeded
- [ ] Security rule violations

### 5. Document Baseline Metrics

Record initial metrics:
- Daily read operations: _______
- Daily write operations: _______
- Average response time: _______
- Error rate: _______
- Daily cost: _______

## Rollback Plan

If issues occur:

### Quick Rollback

```bash
# Restore previous rules
firebase deploy --only firestore:rules --config firestore.rules.backup

# Restore previous hosting
firebase hosting:rollback
```

### Manual Rollback

1. Revert `firestore.rules` to backup
2. Deploy old rules: `firebase deploy --only firestore:rules`
3. Revert code changes
4. Rebuild and redeploy

## Verification Tests

### Test 1: Rate Limiting
```bash
# Expected: First 10 succeed, rest fail
curl -X POST https://your-app.com/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"Test","content":"Test"}' \
  --repeat 15
```

### Test 2: XSS Prevention
```bash
# Expected: Content sanitized or rejected
curl -X POST https://your-app.com/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"<script>alert(1)</script>","content":"Test"}'
```

### Test 3: Unauthorized Access
```bash
# Expected: 403 Forbidden
curl -X DELETE https://your-app.com/api/posts/other-user-post \
  -H "Authorization: Bearer $TOKEN"
```

### Test 4: Content Validation
```bash
# Expected: 400 Bad Request
curl -X POST https://your-app.com/api/posts \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"title":"","content":""}'
```

## Monitoring Schedule

### Daily
- [ ] Check Firebase Console for anomalies
- [ ] Review error logs
- [ ] Check cost trends

### Weekly
- [ ] Review security event logs
- [ ] Analyze rate limit violations
- [ ] Check for suspicious patterns
- [ ] Update rate limits if needed

### Monthly
- [ ] Security audit
- [ ] Dependency updates
- [ ] Performance review
- [ ] Cost optimization review

## Emergency Contacts

- Firebase Support: https://firebase.google.com/support
- Security Issues: [Your security email]
- On-Call Developer: [Contact info]

## Success Criteria

Deployment is successful when:
- [x] All tests pass
- [x] No console errors
- [x] Rate limiting works
- [x] Security features active
- [x] Performance acceptable
- [x] Costs within budget
- [x] No user complaints
- [x] Monitoring active

## Known Issues

Document any known issues:
1. _None currently_

## Additional Notes

- Rate limits are client-side only. Consider adding server-side rate limiting with Cloud Functions for production.
- DOMPurify adds ~45KB to bundle size. Consider lazy loading if needed.
- Security monitoring is in-memory only. Consider persisting to database for long-term analysis.
- CSRF tokens are session-based. Clear on logout.

## Next Steps

After successful deployment:
1. Monitor for 24-48 hours
2. Adjust rate limits based on usage
3. Implement server-side rate limiting
4. Add CAPTCHA for sensitive operations
5. Set up automated security scanning
6. Configure WAF rules
7. Implement audit logging to database
8. Add IP-based blocking
9. Set up anomaly detection
10. Regular security audits

## Sign-Off

- [ ] Developer: _________________ Date: _______
- [ ] QA: _________________ Date: _______
- [ ] Security Review: _________________ Date: _______
- [ ] Deployment: _________________ Date: _______

---

**Last Updated:** [Current Date]
**Version:** 1.0.0
**Status:** Ready for Deployment
