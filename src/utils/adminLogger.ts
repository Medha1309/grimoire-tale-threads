import { collection, addDoc, serverTimestamp, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { AdminLog } from '../types';

/**
 * Admin action logger for FIPPA compliance
 * Logs all administrative actions for audit trail
 */
export class AdminLogger {
  private static async getClientIP(): Promise<string> {
    try {
      // In production, this should be handled by your backend
      // For now, we'll use a placeholder
      return 'client-ip-placeholder';
    } catch {
      return 'unknown';
    }
  }

  /**
   * Log an admin action
   */
  static async log(
    adminId: string,
    adminEmail: string,
    action: string,
    targetType: AdminLog['targetType'],
    targetId: string,
    details: Record<string, any> = {}
  ): Promise<void> {
    try {
      const ipAddress = await this.getClientIP();
      
      const logEntry: Omit<AdminLog, 'id'> = {
        adminId,
        adminEmail,
        action,
        targetType,
        targetId,
        details,
        ipAddress,
        timestamp: serverTimestamp(),
      };

      await addDoc(collection(db, 'adminLogs'), logEntry);
    } catch (error) {
      console.error('Failed to log admin action:', error);
      // Don't throw - logging failure shouldn't break admin operations
    }
  }

  /**
   * Get recent logs for a specific target
   */
  static async getLogsForTarget(
    targetType: AdminLog['targetType'],
    targetId: string,
    limitCount: number = 50
  ): Promise<AdminLog[]> {
    try {
      const q = query(
        collection(db, 'adminLogs'),
        where('targetType', '==', targetType),
        where('targetId', '==', targetId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AdminLog));
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      return [];
    }
  }

  /**
   * Get recent logs by admin
   */
  static async getLogsByAdmin(
    adminId: string,
    limitCount: number = 100
  ): Promise<AdminLog[]> {
    try {
      const q = query(
        collection(db, 'adminLogs'),
        where('adminId', '==', adminId),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AdminLog));
    } catch (error) {
      console.error('Failed to fetch admin logs:', error);
      return [];
    }
  }

  /**
   * Get all recent logs
   */
  static async getRecentLogs(limitCount: number = 100): Promise<AdminLog[]> {
    try {
      const q = query(
        collection(db, 'adminLogs'),
        orderBy('timestamp', 'desc'),
        limit(limitCount)
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as AdminLog));
    } catch (error) {
      console.error('Failed to fetch recent logs:', error);
      return [];
    }
  }
}

// Convenience functions for common actions
export const logUserUpdate = (adminId: string, adminEmail: string, userId: string, changes: Record<string, any>) =>
  AdminLogger.log(adminId, adminEmail, 'user_update', 'user', userId, changes);

export const logUserSuspension = (adminId: string, adminEmail: string, userId: string, reason: string) =>
  AdminLogger.log(adminId, adminEmail, 'user_suspend', 'user', userId, { reason });

export const logUserDeletion = (adminId: string, adminEmail: string, userId: string, reason: string) =>
  AdminLogger.log(adminId, adminEmail, 'user_delete', 'user', userId, { reason });

export const logContentModeration = (adminId: string, adminEmail: string, contentType: string, contentId: string, action: string) =>
  AdminLogger.log(adminId, adminEmail, 'content_moderate', 'content', contentId, { contentType, action });

export const logDataExport = (adminId: string, adminEmail: string, userId: string, exportType: string) =>
  AdminLogger.log(adminId, adminEmail, 'data_export', 'data', userId, { exportType });

export const logSystemChange = (adminId: string, adminEmail: string, setting: string, oldValue: any, newValue: any) =>
  AdminLogger.log(adminId, adminEmail, 'system_change', 'system', setting, { oldValue, newValue });
