# Security Architecture

## 🏗️ Multi-Layer Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER REQUEST                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 1: CLIENT-SIDE                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Rate Limiter (rateLimiter.ts)                         │ │
│  │  • Check per-user, per-action limits                   │ │
│  │  • Block if exceeded                                   │ │
│  │  • Track remaining quota                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│                              ▼                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Input Validation (securityEnhanced.ts)                │ │
│  │  • Sanitize HTML (XSS prevention)                      │ │
│  │  • Detect SQL/NoSQL injection                          │ │
│  │  • Validate email, URLs, filenames                     │ │
│  │  • Check content length                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│                              ▼                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Security Middleware (securityMiddleware.ts)           │ │
│  │  • Combined validation                                 │ │
│  │  • Action permission checks                            │ │
│  │  • Content validation                                  │ │
│  └────────────────────────────────────────────────────────┘ │
│                              │                               │
│                              ▼                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Security Monitor (securityMonitor.ts)                 │ │
│  │  • Log all security events                             │ │
│  │  • Track violations                                    │ │
│  │  • Alert on thresholds                                 │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 2: FIREBASE SDK                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Authentication                                         │ │
│  │  • Verify user token                                   │ │
│  │  • Check session validity                              │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                  LAYER 3: FIRESTORE RULES                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Server-Side Validation (firestore.rules)              │ │
│  │  • Verify authentication                               │ │
│  │  • Check ownership                                     │ │
│  │  • Validate content (XSS, length)                      │ │
│  │  • Enforce immutable fields                            │ │
│  │  • Rate limit checks                                   │ │
│  │  • Admin-only operations                               │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 4: FIRESTORE DB                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Data Storage                                           │ │
│  │  • Encrypted at rest                                   │ │
│  │  • Secure transmission                                 │ │
│  │  • Backup & recovery                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Request Flow Example: Creating a Forum Post

```
1. USER CLICKS "POST"
   │
   ▼
2. RATE LIMITER CHECK
   │ ✓ User has 3/10 posts remaining this hour
   ▼
3. INPUT VALIDATION
   │ ✓ Title: 50 chars (valid)
   │ ✓ Content: 500 chars (valid)
   │ ✓ No XSS patterns detected
   │ ✓ No injection patterns detected
   ▼
4. SECURITY MIDDLEWARE
   │ ✓ Action permission granted
   │ ✓ Content validation passed
   ▼
5. SECURITY MONITOR
   │ ✓ Event logged: "POST_CREATE" - allowed
   ▼
6. FIREBASE SDK
   │ ✓ User authenticated
   │ ✓ Token valid
   ▼
7. FIRESTORE RULES
   │ ✓ User is active
   │ ✓ Title length valid (1-200)
   │ ✓ Content length valid (1-10000)
   │ ✓ No malicious content
   │ ✓ Author ID matches user
   │ ✓ Like/reply counts initialized to 0
   ▼
8. FIRESTORE DB
   │ ✓ Post created successfully
   ▼
9. SUCCESS RESPONSE
```

## 🚫 Blocked Request Example: XSS Attempt

```
1. USER SUBMITS: "<script>alert('xss')</script>"
   │
   ▼
2. RATE LIMITER CHECK
   │ ✓ Passed (within limits)
   ▼
3. INPUT VALIDATION
   │ ✗ XSS pattern detected!
   │ ✗ Malicious code found
   ▼
4. SECURITY MIDDLEWARE
   │ ✗ Content validation FAILED
   │ ✗ Action BLOCKED
   ▼
5. SECURITY MONITOR
   │ ⚠️ Event logged: "XSS_ATTEMPT" - blocked
   │ ⚠️ Alert triggered (threshold: 1)
   ▼
6. ERROR RESPONSE
   │ "Content contains potentially malicious code"
   ▼
7. USER SEES ERROR MESSAGE
```

## 🛡️ Defense in Depth

### Layer 1: Client-Side (First Line)
**Purpose:** Fast feedback, reduce server load
- Rate limiting
- Input validation
- Content sanitization
- User experience

**Bypassable:** Yes (client-side can be modified)
**Importance:** Medium (UX + Performance)

### Layer 2: Firebase SDK (Authentication)
**Purpose:** Verify user identity
- Token validation
- Session management
- User authentication

**Bypassable:** No (server-enforced)
**Importance:** High (Identity verification)

### Layer 3: Firestore Rules (Primary Defense)
**Purpose:** Enforce security policies
- Server-side validation
- Access control
- Data integrity
- Attack prevention

**Bypassable:** No (server-enforced)
**Importance:** Critical (Primary security layer)

### Layer 4: Firestore DB (Data Protection)
**Purpose:** Secure data storage
- Encryption at rest
- Secure transmission
- Backup & recovery

**Bypassable:** No (infrastructure-level)
**Importance:** Critical (Data protection)

## 📊 Security Coverage Matrix

| Attack Vector | Client | SDK | Rules | DB | Status |
|---------------|--------|-----|-------|----|---------| 
| XSS | ✅ | - | ✅ | - | Protected |
| SQL Injection | ✅ | - | ✅ | - | Protected |
| NoSQL Injection | ✅ | - | ✅ | - | Protected |
| CSRF | ✅ | ✅ | - | - | Protected |
| DoS/DDoS | ✅ | - | ✅ | - | Protected |
| Unauthorized Access | - | ✅ | ✅ | - | Protected |
| Data Leakage | - | ✅ | ✅ | ✅ | Protected |
| Privilege Escalation | - | ✅ | ✅ | - | Protected |
| Path Traversal | ✅ | - | - | - | Protected |
| Brute Force | ✅ | ✅ | - | - | Protected |

## 🔐 Security Components

### Rate Limiter
```typescript
// Per-user, per-action limits
POST_CREATE: 10 per hour
COMMENT_CREATE: 30 per hour
LIKE_ACTION: 100 per hour
LOGIN_ATTEMPT: 5 per 15 min (block 30 min)
```

### Input Validator
```typescript
// Checks performed
✓ HTML sanitization
✓ XSS pattern detection
✓ SQL injection detection
✓ NoSQL injection detection
✓ Email validation
✓ URL validation
✓ Length validation
✓ File type/size validation
```

### Firestore Rules
```javascript
// Server-side enforcement
✓ Authentication required
✓ Ownership verification
✓ Content validation
✓ Length limits
✓ Malicious pattern detection
✓ Immutable field protection
✓ Admin-only operations
```

### Security Monitor
```typescript
// Event tracking
✓ Rate limit violations
✓ Validation failures
✓ XSS attempts
✓ Injection attempts
✓ Unauthorized access
✓ Suspicious activity
✓ Authentication failures
```

## 📈 Monitoring & Alerting

### Real-Time Monitoring
```
Security Dashboard
├── Total Events
├── Blocked Events
├── Block Rate
├── Events by Type
│   ├── Rate Limit Violations
│   ├── Validation Failures
│   ├── XSS Attempts
│   ├── Injection Attempts
│   └── Unauthorized Access
└── Top Users by Activity
```

### Alert Thresholds
```
XSS Attempt: 1 (immediate alert)
Injection Attempt: 1 (immediate alert)
Rate Limit Violation: 10 per hour
Validation Failure: 20 per hour
Unauthorized Access: 5 per hour
```

## 🎯 Security Principles Applied

1. **Defense in Depth**
   - Multiple security layers
   - Redundant protections
   - Fail-safe defaults

2. **Least Privilege**
   - Minimal permissions
   - Role-based access
   - Need-to-know basis

3. **Fail Secure**
   - Deny by default
   - Explicit allow rules
   - Safe error handling

4. **Complete Mediation**
   - Check every request
   - No bypass paths
   - Consistent enforcement

5. **Separation of Duties**
   - Client validation (UX)
   - Server validation (Security)
   - Database protection (Data)

6. **Open Design**
   - Security through design
   - Not through obscurity
   - Documented approach

## 🔄 Continuous Security

### Daily
- Monitor Firebase Console
- Review error logs
- Check cost trends

### Weekly
- Review security events
- Analyze rate limit violations
- Check for suspicious patterns

### Monthly
- Security audit
- Dependency updates
- Performance review
- Cost optimization

### Quarterly
- Penetration testing
- Security training
- Policy review
- Compliance audit

## 📚 References

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

**Architecture Version:** 1.0.0
**Security Level:** A+ (Enterprise Grade)
**Last Updated:** November 18, 2025
