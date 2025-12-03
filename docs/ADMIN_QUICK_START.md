# Admin System Quick Start Guide

## Overview
The new admin system provides comprehensive FIPPA-compliant user and data management capabilities.

## Accessing the Admin Dashboard

1. **Login as Admin**
   - Navigate to `/login`
   - Sign in with an admin account
   - Your user profile must have `isAdmin: true` in Firestore

2. **Navigate to Admin**
   - Go to `/admin` or click "Admin" in the navigation (if admin)
   - You'll see the new comprehensive dashboard

## Dashboard Tabs

### 1. Overview
- Quick statistics and metrics
- Recent users and messages
- System health indicators
- Quick access to common tasks

### 2. Users
**Full user management with FIPPA compliance:**

- **Search & Filter**: Find users by name, email, or status
- **View Details**: Complete user profile and activity stats
- **Role Management**: Toggle Author/Admin status
- **Export Data**: Download user data in JSON or CSV (FIPPA data portability)
- **Suspend Account**: Temporarily disable user access with reason
- **Reactivate**: Restore suspended accounts
- **Delete/Anonymize**: 
  - Anonymize: Keep content but remove personal info (recommended)
  - Delete: Permanently remove all user data

### 3. Messages
- View all contact form submissions
- Mark as read/unread
- Reply via email
- Track message history

### 4. Content Moderation
- View all user-generated content
- Filter by type (Forum Posts, Diary Entries, Stories)
- Delete inappropriate content with audit trail
- Bulk moderation actions

### 5. Audit Logs
- Complete history of all admin actions
- Track who did what and when
- IP address logging
- Immutable audit trail for compliance
- Filter by action type, admin, or target

### 6. Settings
- Data retention policies
- Privacy policy version tracking
- Authentication settings
- Content limits
- System maintenance mode

## Key Features

### FIPPA Compliance

✅ **Data Access Rights**
- Users can request their data
- Admins can export complete user data
- JSON and CSV export formats

✅ **Right to be Forgotten**
- Full user deletion
- Anonymization option (keeps content, removes PII)
- Audit trail of deletions

✅ **Audit Trail**
- All admin actions logged
- Immutable logs
- IP tracking
- Timestamp tracking

✅ **Data Security**
- Role-based access control
- Firestore security rules
- Admin-only access to sensitive data

### User Management Actions

**Update User**
```typescript
await adminActions.updateUser(userId, {
  displayName: 'New Name',
  bio: 'Updated bio',
  isAuthor: true
});
```

**Suspend User**
```typescript
await adminActions.suspendUser(userId, 'Violation of terms', 30); // 30 days
```

**Delete User**
```typescript
await adminActions.deleteUser(userId, 'User request', true); // true = anonymize
```

**Export User Data**
```typescript
await adminActions.exportUserDataJSON(userId, userName);
await adminActions.exportUserDataCSV(userId, userName);
```

## Setting Up Admin Access

### 1. Make a User Admin

Using Firebase Console:
1. Go to Firestore Database
2. Navigate to `users` collection
3. Find the user document
4. Add field: `isAdmin: true`

Using Firebase CLI:
```javascript
// In Firebase Console or script
db.collection('users').doc(userId).update({
  isAdmin: true
});
```

### 2. Verify Firestore Rules

Ensure your `firestore.rules` includes:
```
function isAdmin() {
  return isAuthenticated() && 
         exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
}
```

### 3. Test Admin Access

1. Login with admin account
2. Navigate to `/admin`
3. You should see the full dashboard
4. Try viewing users, exporting data, etc.

## Database Collections

### adminLogs
Stores all administrative actions:
- `adminId`: Who performed the action
- `action`: What was done
- `targetType`: user/content/system/data
- `targetId`: What was affected
- `details`: Additional information
- `timestamp`: When it happened
- `ipAddress`: Where it came from

### dataExportRequests
Tracks data export requests:
- `userId`: User whose data is being exported
- `requestedBy`: Admin who requested it
- `status`: pending/processing/completed/failed
- `exportUrl`: Download link (when ready)
- `exportType`: user_data/all_data/content_only

### contentReports
User-reported content:
- `reporterId`: Who reported it
- `contentType`: What type of content
- `contentId`: Specific content ID
- `reason`: Why it was reported
- `status`: pending/reviewed/actioned/dismissed

## Best Practices

### 1. Always Provide Reasons
When suspending or deleting users, always provide clear reasons for audit trail.

### 2. Use Anonymization
Prefer anonymization over deletion to maintain content integrity while respecting privacy.

### 3. Regular Audit Reviews
Periodically review audit logs to ensure proper admin behavior.

### 4. Export Before Delete
Always export user data before permanent deletion for compliance.

### 5. Document Policy Changes
Update privacy policy version in settings when making changes.

## Troubleshooting

### Can't Access Admin Dashboard
- Verify `isAdmin: true` in Firestore user document
- Check Firestore rules are deployed
- Clear browser cache and re-login

### Export Not Working
- Check browser console for errors
- Verify user has data to export
- Ensure popup blockers aren't interfering

### Audit Logs Not Showing
- Verify Firestore rules allow admin read access
- Check that actions are being performed (logs are created on action)
- Ensure proper indexes exist

## Security Notes

1. **Admin accounts are powerful** - Only grant to trusted users
2. **Audit logs are immutable** - They cannot be edited or deleted
3. **All actions are tracked** - Admins are accountable for their actions
4. **IP addresses are logged** - For security and compliance
5. **Data exports contain PII** - Handle with care

## Next Steps

1. Set up your first admin account
2. Review and customize system settings
3. Test user management features
4. Set up data retention policies
5. Train admin team on proper usage
6. Document your organization's admin procedures

## Support

For issues or questions:
- Check the audit logs for action history
- Review Firestore rules for access issues
- Check browser console for errors
- Verify Firebase configuration

## Compliance Checklist

- [ ] Admin accounts created and secured
- [ ] Data retention policy configured
- [ ] Privacy policy version set
- [ ] Audit logging verified
- [ ] Data export tested
- [ ] User deletion/anonymization tested
- [ ] Firestore rules deployed
- [ ] Admin team trained
- [ ] Incident response plan documented
- [ ] Regular audit log reviews scheduled
