# Contact Form & Admin Setup

## Overview
The contact form now saves messages to Firestore and admins can view them in a dedicated admin panel.

## Features

### Contact Form (`/contact`)
- Users can submit contact messages with name, email, subject, and message
- Messages are saved to Firestore collection `contactMessages`
- Includes honeypot field for spam protection
- Shows success confirmation after submission

### Admin Panel (`/admin`)

#### Contact Messages Tab
- View all contact messages in real-time
- See unread message count with badge
- Mark messages as read automatically when clicked
- View full message details
- Reply via email with one click

#### Users Tab
- View all registered users
- See user profiles with avatar, name, email
- View user stats (forum posts, diary entries, likes)
- Author and Admin badges
- Email users directly
- User management options (coming soon)
- Requires authentication to access

## Database Structure

### Collection: `contactMessages`
```typescript
{
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Timestamp;
  read: boolean;
}
```

### Collection: `users`
```typescript
{
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  bio?: string;
  createdAt: Timestamp;
  isAuthor: boolean;
  isAdmin?: boolean;
  forumPostCount?: number;
  diaryEntryCount?: number;
  totalLikesReceived?: number;
}
```

## Firestore Rules
- Anyone can create contact messages (no auth required)
- Only authenticated users can read messages
- Authenticated users can update messages (for marking as read)
- Only admins can delete messages

## Access

### For Users
- Navigate to `/contact` to send a message
- No authentication required

### For Admins
- Navigate to `/admin` to view messages
- Must be logged in
- Can also access `/admin/populate` for mock data

### Quick Access Links
- **Navbar**: Admin gear icon (⚙️) in the top navigation (desktop & mobile)
- **Profile Page**: Admin Panel card at the bottom of your profile
- **Direct URL**: `/admin`

## Setup Instructions

1. **Deploy Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Access Admin Panel**
   - Login to your account
   - Navigate to `/admin`
   - View and manage contact messages

## Admin Features

### User Management
- View all registered users with profiles
- See user activity stats
- Identify authors and admins with badges
- Email users directly from admin panel
- View user join dates and engagement metrics

### Contact Management
- Real-time message updates
- Unread message tracking
- One-click email replies
- Message history

## Future Enhancements

### Contact Messages
- Email notifications when new messages arrive
- Message filtering and search
- Archive/delete functionality
- Response templates
- Message categories/tags

### User Management
- Grant/revoke author status
- Grant/revoke admin privileges
- Suspend/ban users
- View user activity timeline
- Export user data
- Bulk user operations
- User search and filtering
