# Security Quick Reference Guide

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Deploy Security Rules
```bash
firebase deploy --only firestore:rules
```

### 3. Test Security
```bash
npm run test
```

## 📝 Common Security Tasks

### Check Rate Limit Before Action
```typescript
import { checkRateLimit } from './utils/rateLimiter';

const result = checkRateLimit(userId, 'POST_CREATE');
if (!result.allowed) {
  alert(result.error);
  return;
}
// Proceed with action
```

### Sanitize User Input
```typescript
import { sanitizeHtml, sanitizeInput } from './utils/securityEnhanced';

// For display (HTML)
const safeHtml = sanitizeHtml(userInput);

// For storage (plain text)
const safeText = sanitizeInput(userInput, 1000);
```

### Validate Content
```typescript
import { validateContent } from './utils/securityEnhanced';

const validation = validateContent(userInput);
if (!validation.valid) {
  alert(validation.errors.join(', '));
  return;
}
```

### Validate Email
```typescript
import { validateEmail } from './utils/securityEnhanced';

if (!validateEmail(email)) {
  alert('Invalid email address');
  return;
}
```

### Check Password Strength
```typescript
import { validatePassword } from './utils/securityEnhanced';

const result = validatePassword(password);
console.log('Strength:', result.strength); // weak, medium, strong
console.log('Errors:', result.errors);
```

## 🛡️ Security Middleware Usage

### In Hooks
```typescript
import { checkActionPermission, validatePostCreation } from '../middleware/securityMiddleware';

// Check rate limit
const rateLimitCheck = checkActionPermission(userId, 'POST_CREATE');
if (!rateLimitCheck.allowed) {
  throw new Error(rateLimitCheck.error);
}

// Validate content
const validation = validatePostCreation(title, content);
if (!validation.allowed) {
  throw new Error(validation.error);
}
```

### In Components
```typescript
import { validateContactForm } from '../middleware/securityMiddleware';

const handleSubmit = async () => {
  const validation = validateContactForm(name, email, message);
  if (!validation.allowed) {
    setError(validation.error);
    return;
  }
  // Submit form
};
```

## 📊 Rate Limits Reference

| Action | Limit | Window | Block Duration |
|--------|-------|--------|----------------|
| Login | 5 | 15 min | 30 min |
| Signup | 3 | 1 hour | 1 hour |
| Password Reset | 3 | 1 hour | - |
| Forum Post | 10 | 1 hour | - |
| Comment | 30 | 1 hour | - |
| Story | 5 | 1 hour | - |
| Diary Entry | 20 | 1 hour | - |
| Like | 100 | 1 hour | - |
| Follow | 50 | 1 hour | - |
| Bookmark | 100 | 1 hour | - |
| Query | 200 | 1 hour | - |
| Contact | 3 | 24 hours | - |

## 🔒 Content Limits

| Content Type | Min | Max |
|--------------|-----|-----|
| Title | 1 | 200 |
| Forum Post | 1 | 10,000 |
| Comment | 1 | 5,000 |
| Story | 1 | 500,000 |
| Diary Entry | 1 | 50,000 |
| Bio | 0 | 500 |
| Display Name | 1 | 50 |
| Email | - | 254 |
| File Size | - | 5 MB |

## 🚨 Security Checklist

### Before Creating Content:
- [ ] Check rate limit
- [ ] Validate input length
- [ ] Sanitize content
- [ ] Check for malicious patterns
- [ ] Verify user authentication

### Before Updating Content:
- [ ] Verify ownership
- [ ] Check rate limit
- [ ] Validate new content
- [ ] Ensure immutable fields unchanged

### Before Deleting Content:
- [ ] Verify ownership or admin
- [ ] Check dependencies
- [ ] Log action

## 🔧 Troubleshooting

### "Rate limit exceeded"
- Wait for the reset time
- Check `rateLimitInfo.resetIn` for countdown
- Reduce action frequency

### "Content contains malicious code"
- Remove HTML tags
- Remove JavaScript
- Remove special characters
- Use plain text

### "Invalid content length"
- Check min/max limits
- Trim whitespace
- Remove unnecessary content

### "Permission denied" (Firestore)
- Check authentication
- Verify ownership
- Check account status
- Review Firestore rules

## 📈 Monitoring

### Check Rate Limit Status
```typescript
import { rateLimiter, getRateLimitKey } from './utils/rateLimiter';

const key = getRateLimitKey(userId, 'POST_CREATE');
const status = rateLimiter.checkLimit(key, RATE_LIMITS.POST_CREATE);
console.log('Remaining:', status.remaining);
console.log('Reset in:', status.resetIn, 'ms');
```

### Reset Rate Limit (Admin Only)
```typescript
import { rateLimiter, getRateLimitKey } from './utils/rateLimiter';

const key = getRateLimitKey(userId, 'POST_CREATE');
rateLimiter.reset(key);
```

### Block User (Admin Only)
```typescript
import { rateLimiter, getRateLimitKey } from './utils/rateLimiter';

const key = getRateLimitKey(userId, 'POST_CREATE');
rateLimiter.block(key, 24 * 60 * 60 * 1000); // 24 hours
```

## 🧪 Testing Security

### Test XSS Prevention
```typescript
const malicious = '<script>alert("xss")</script>';
const safe = sanitizeHtml(malicious);
expect(safe).not.toContain('<script>');
```

### Test Rate Limiting
```typescript
for (let i = 0; i < 15; i++) {
  const result = checkRateLimit(userId, 'POST_CREATE');
  if (i < 10) {
    expect(result.allowed).toBe(true);
  } else {
    expect(result.allowed).toBe(false);
  }
}
```

### Test Injection Detection
```typescript
const sqlInjection = "' OR '1'='1";
expect(detectSqlInjection(sqlInjection)).toBe(true);

const noSqlInjection = '{ "$ne": null }';
expect(detectNoSqlInjection(noSqlInjection)).toBe(true);
```

## 🎯 Best Practices

1. **Always validate on both client and server**
   - Client: User experience
   - Server: Security enforcement

2. **Use rate limiting for all write operations**
   - Prevents spam
   - Reduces costs
   - Improves performance

3. **Sanitize all user input**
   - Before display
   - Before storage
   - Before processing

4. **Log security events**
   - Failed validations
   - Rate limit violations
   - Suspicious patterns

5. **Monitor Firebase usage**
   - Daily read/write counts
   - Cost trends
   - Error rates

6. **Regular security audits**
   - Review Firestore rules
   - Update dependencies
   - Test attack vectors

7. **Keep secrets secure**
   - Use environment variables
   - Never commit API keys
   - Rotate credentials regularly

## 📞 Emergency Response

### If Under Attack:
1. Check Firebase Console for unusual activity
2. Temporarily increase rate limits or block IPs
3. Review recent code changes
4. Check error logs
5. Deploy stricter Firestore rules
6. Contact Firebase support if needed

### If Costs Spike:
1. Check Firebase Console usage metrics
2. Identify expensive queries
3. Add caching where missing
4. Reduce rate limits temporarily
5. Review and optimize Firestore rules
6. Consider upgrading Firebase plan

## 📚 Additional Resources

- [Full Security Documentation](./SECURITY_HARDENING_COMPLETE.md)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)
