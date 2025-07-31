import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
  onSnapshot,
  DocumentData,
  DocumentSnapshot
} from 'firebase/firestore';
import { db } from './firebase';
import { Client, Booking } from '../types';

export const COLLECTIONS = {
  CLIENTS: 'clients',
  BOOKINGS: 'bookings',
} as const;

const convertTimestamp = (timestamp: Timestamp | Date): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate();
  }
  return timestamp;
};

const convertToTimestamp = (date: Date | Timestamp): Timestamp => {
  if (date instanceof Timestamp) {
    return date;
  }
  if (!date || !(date instanceof Date)) {
    throw new Error('Invalid date provided to convertToTimestamp');
  }
  return Timestamp.fromDate(date);
};

const convertDocument = <T>(doc: DocumentSnapshot<DocumentData>): T | null => {
  if (!doc.exists()) return null;
  
  const data = doc.data();
  if (!data) return null;

  const convertedData = Object.keys(data).reduce((acc, key) => {
    const value = data[key];
    if (value instanceof Timestamp) {
      acc[key] = convertTimestamp(value);
    } else {
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, unknown>);

  return {
    id: doc.id,
    ...convertedData
  } as T;
};

export const clientService = {
  async getAll(): Promise<Client[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.CLIENTS));
    return querySnapshot.docs.map(doc => convertDocument<Client>(doc)!);
  },

  async getById(id: string): Promise<Client | null> {
    const docRef = doc(db, COLLECTIONS.CLIENTS, id);
    const docSnap = await getDoc(docRef);
    return convertDocument<Client>(docSnap);
  },

  async getByCoach(coachId: string): Promise<Client[]> {
    const q = query(
      collection(db, COLLECTIONS.CLIENTS),
      where('coachId', '==', coachId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Client>(doc)!);
  },

  async getByStatus(status: Client['status']): Promise<Client[]> {
    const q = query(
      collection(db, COLLECTIONS.CLIENTS),
      where('status', '==', status)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Client>(doc)!);
  },

  async search(query: string): Promise<Client[]> {
    const allClients = await this.getAll();
    const lowercaseQuery = query.toLowerCase();
    return allClients.filter(client => 
      client.name.toLowerCase().includes(lowercaseQuery) ||
      client.email?.toLowerCase().includes(lowercaseQuery)
    );
  },

  async add(client: Omit<Client, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.CLIENTS), {
      ...client,
      createdAt: convertToTimestamp(client.createdAt)
    });
    return docRef.id;
  },

  async update(id: string, updates: Partial<Client>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CLIENTS, id);
    const updateData = { ...updates };
    
    if (updates.createdAt) {
      updateData.createdAt = convertToTimestamp(updates.createdAt as Date);
    }
    
    await updateDoc(docRef, updateData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.CLIENTS, id);
    await deleteDoc(docRef);
  },

  async getStats() {
    const allClients = await this.getAll();
    const total = allClients.length;
    const active = allClients.filter(c => c.status === 'active').length;
    const inactive = allClients.filter(c => c.status === 'inactive').length;
    const prospects = allClients.filter(c => c.status === 'prospect').length;

    return {
      total,
      active,
      inactive,
      prospects,
      activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
      conversionRate: (active + prospects) > 0 ? Math.round((active / (active + prospects)) * 100) : 0
    };
  },

  async getRecent(): Promise<Client[]> {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const q = query(
      collection(db, COLLECTIONS.CLIENTS),
      where('createdAt', '>=', convertToTimestamp(thirtyDaysAgo)),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Client>(doc)!);
  },

  onSnapshot(callback: (clients: Client[]) => void) {
    return onSnapshot(collection(db, COLLECTIONS.CLIENTS), (snapshot) => {
      const clients = snapshot.docs.map(doc => convertDocument<Client>(doc)!);
      callback(clients);
    });
  }
};

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const querySnapshot = await getDocs(collection(db, COLLECTIONS.BOOKINGS));
    return querySnapshot.docs.map(doc => convertDocument<Booking>(doc)!);
  },

  async getById(id: string): Promise<Booking | null> {
    const docRef = doc(db, COLLECTIONS.BOOKINGS, id);
    const docSnap = await getDoc(docRef);
    return convertDocument<Booking>(docSnap);
  },

  async getByCoach(coachId: string): Promise<Booking[]> {
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('coachId', '==', coachId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Booking>(doc)!);
  },

  async getByClient(clientId: string): Promise<Booking[]> {
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('clientId', '==', clientId),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Booking>(doc)!);
  },

  async getByDateRange(startDate: string, endDate: string): Promise<Booking[]> {
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Booking>(doc)!);
  },

  async getByClientAndTime(clientId: string, date: string, time: string): Promise<Booking[]> {
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('clientId', '==', clientId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => convertDocument<Booking>(doc)!)
      .filter(booking => booking.date === date && booking.time === time);
  },

  async checkRecurringConflicts(clientId: string, recurringDay: number, time: string, startDate: string): Promise<Booking[]> {
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('clientId', '==', clientId),
      where('isRecurring', '==', true)
    );
    const querySnapshot = await getDocs(q);
    
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 84);
    const endDateStr = endDate.toISOString().split('T')[0];
    
    return querySnapshot.docs
      .map(doc => convertDocument<Booking>(doc)!)
      .filter(booking => 
        booking.recurringDay === recurringDay &&
        booking.time === time &&
        booking.date >= startDate &&
        booking.date <= endDateStr
      );
  },

  async getByDate(date: string): Promise<Booking[]> {
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('date', '==', date),
      orderBy('time', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Booking>(doc)!);
  },

  async getUpcomingPaginated(limit: number = 10): Promise<Booking[]> {
    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('date', '>=', today),
      where('status', '==', 'scheduled')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => convertDocument<Booking>(doc)!)
      .sort((a, b) => {
        if (a.date !== b.date) return a.date.localeCompare(b.date);
        return a.time.localeCompare(b.time);
      })
      .slice(0, limit);
  },

  async getUpcoming(): Promise<Booking[]> {
    const today = new Date().toISOString().split('T')[0];
    const q = query(
      collection(db, COLLECTIONS.BOOKINGS),
      where('date', '>=', today),
      where('status', '==', 'scheduled'),
      orderBy('date', 'asc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => convertDocument<Booking>(doc)!);
  },

  async add(booking: Omit<Booking, 'id'>): Promise<string> {
    const docRef = await addDoc(collection(db, COLLECTIONS.BOOKINGS), {
      ...booking,
      createdAt: booking.createdAt ? convertToTimestamp(booking.createdAt) : Timestamp.now()
    });
    return docRef.id;
  },

  async update(id: string, updates: Partial<Booking>): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BOOKINGS, id);
    const updateData = { ...updates };
    
    if (updates.createdAt) {
      updateData.createdAt = convertToTimestamp(updates.createdAt as Date);
    }
    
    await updateDoc(docRef, updateData);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(db, COLLECTIONS.BOOKINGS, id);
    await deleteDoc(docRef);
  },

  async getStats() {
    const allBookings = await this.getAll();
    const total = allBookings.length;
    const completed = allBookings.filter(b => b.status === 'completed').length;
    const upcoming = allBookings.filter(b => b.status === 'scheduled').length;
    const cancelled = allBookings.filter(b => b.status === 'cancelled').length;

    return {
      total,
      completed,
      upcoming,
      cancelled,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  },

  onSnapshot(callback: (bookings: Booking[]) => void) {
    return onSnapshot(collection(db, COLLECTIONS.BOOKINGS), (snapshot) => {
      const bookings = snapshot.docs.map(doc => convertDocument<Booking>(doc)!);
      callback(bookings);
    });
  }
};

export const batchService = {
  async addClients(clients: Omit<Client, 'id'>[]): Promise<void> {
    const batch = writeBatch(db);
    
    clients.forEach(client => {
      const docRef = doc(collection(db, COLLECTIONS.CLIENTS));
      batch.set(docRef, {
        ...client,
        createdAt: convertToTimestamp(client.createdAt)
      });
    });
    
    await batch.commit();
  },

  async updateClients(updates: { id: string; data: Partial<Client> }[]): Promise<void> {
    const batch = writeBatch(db);
    
    updates.forEach(({ id, data }) => {
      const docRef = doc(db, COLLECTIONS.CLIENTS, id);
      const updateData = { ...data };
      
      if (data.createdAt) {
        updateData.createdAt = convertToTimestamp(data.createdAt as Date);
      }
      
      batch.update(docRef, updateData);
    });
    
    await batch.commit();
  },

  async deleteClients(ids: string[]): Promise<void> {
    const batch = writeBatch(db);
    
    ids.forEach(id => {
      const docRef = doc(db, COLLECTIONS.CLIENTS, id);
      batch.delete(docRef);
    });
    
    await batch.commit();
  }
};

export const firestoreService = {
  clients: clientService,
  bookings: bookingService,
  batch: batchService
}; 