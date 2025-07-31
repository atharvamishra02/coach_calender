import { Client } from '../types';



export const CLIENT_STATUS = {
  ACTIVE: 'active' as const,
  INACTIVE: 'inactive' as const,
  PROSPECT: 'prospect' as const,
} as const;


export const COACH_IDS = {
  COACH_1: 'coach1',
  COACH_2: 'coach2',
  COACH_3: 'coach3',
} as const;

export const dummyClients: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    phone: '+1-555-0101',
    email: 'sarah.johnson@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Prefers morning sessions. Focus on weight loss and nutrition. Responds well to accountability check-ins.',
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Michael Chen',
    phone: '+1-555-0102',
    email: 'michael.chen@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Interested in nutrition coaching and meal planning. Has food allergies (nuts, shellfish).',
    createdAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    phone: '+1-555-0103',
    email: 'emily.rodriguez@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Fitness enthusiast looking to improve strength training. Prefers evening sessions.',
    createdAt: new Date('2024-02-01')
  },
  {
    id: '4',
    name: 'David Thompson',
    phone: '+1-555-0104',
    email: 'david.thompson@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.INACTIVE,
    notes: 'On hold due to international travel. Will resume coaching in March 2024.',
    createdAt: new Date('2024-01-10')
  },
  {
    id: '5',
    name: 'Lisa Wang',
    phone: '+1-555-0105',
    email: 'lisa.wang@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Working on stress management and work-life balance. Enjoys meditation sessions.',
    createdAt: new Date('2024-02-05')
  },
  {
    id: '6',
    name: 'James Wilson',
    phone: '+1-555-0106',
    email: 'james.wilson@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.PROSPECT,
    notes: 'Initial consultation scheduled for next week. Interested in career coaching.',
    createdAt: new Date('2024-02-10')
  },
  {
    id: '7',
    name: 'Maria Garcia',
    phone: '+1-555-0107',
    email: 'maria.garcia@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Post-pregnancy fitness goals. Gentle approach recommended.',
    createdAt: new Date('2024-01-25')
  },
  {
    id: '8',
    name: 'Robert Brown',
    phone: '+1-555-0108',
    email: 'robert.brown@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Fitness goals focus. Recovering from knee surgery - modified exercises needed.',
    createdAt: new Date('2024-01-30')
  },
  {
    id: '9',
    name: 'Jennifer Davis',
    phone: '+1-555-0109',
    email: 'jennifer.davis@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.INACTIVE,
    notes: 'Paused coaching due to personal circumstances. May return in future.',
    createdAt: new Date('2024-01-05')
  },
  {
    id: '10',
    name: 'Christopher Lee',
    phone: '+1-555-0110',
    email: 'christopher.lee@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'High-performance athlete. Focus on advanced training techniques.',
    createdAt: new Date('2024-02-15')
  },
  {
    id: '11',
    name: 'Amanda Martinez',
    phone: '+1-555-0111',
    email: 'amanda.martinez@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.PROSPECT,
    notes: 'Interested in wellness coaching and holistic health approaches.',
    createdAt: new Date('2024-02-20')
  },
  {
    id: '12',
    name: 'Daniel Anderson',
    phone: '+1-555-0112',
    email: 'daniel.anderson@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Busy executive. Prefers 30-minute focused sessions during lunch breaks.',
    createdAt: new Date('2024-01-12')
  },
  {
    id: '13',
    name: 'Jessica Taylor',
    phone: '+1-555-0113',
    email: 'jessica.taylor@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Weight loss goals. Responds well to weekly progress tracking.',
    createdAt: new Date('2024-01-18')
  },
  {
    id: '14',
    name: 'Matthew White',
    phone: '+1-555-0114',
    email: 'matthew.white@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'New to fitness. Needs beginner-friendly approach and education.',
    createdAt: new Date('2024-02-08')
  },
  {
    id: '15',
    name: 'Nicole Harris',
    phone: '+1-555-0115',
    email: 'nicole.harris@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.INACTIVE,
    notes: 'Paused due to pregnancy. Will resume postpartum fitness program.',
    createdAt: new Date('2024-01-22')
  },
  {
    id: '16',
    name: 'Andrew Clark',
    phone: '+1-555-0116',
    email: 'andrew.clark@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Marathon training. Focus on endurance and injury prevention.',
    createdAt: new Date('2024-02-12')
  },
  {
    id: '17',
    name: 'Rachel Lewis',
    phone: '+1-555-0117',
    email: 'rachel.lewis@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.PROSPECT,
    notes: 'Interested in yoga and mindfulness coaching. Prefers virtual sessions.',
    createdAt: new Date('2024-02-25')
  },
  {
    id: '18',
    name: 'Kevin Hall',
    phone: '+1-555-0118',
    email: 'kevin.hall@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Strength training focus. Working towards powerlifting goals.',
    createdAt: new Date('2024-01-28')
  },
  {
    id: '19',
    name: 'Stephanie Young',
    phone: '+1-555-0119',
    email: 'stephanie.young@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Wellness coaching for stress management and mental health support.',
    createdAt: new Date('2024-02-03')
  },
  {
    id: '20',
    name: 'Ryan King',
    phone: '+1-555-0120',
    email: 'ryan.king@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Marathon training. Focus on speed work and race strategy.',
    createdAt: new Date('2024-02-18')
  },
  {
    id: '21',
    name: 'Sophia Patel',
    phone: '+1-555-0121',
    email: 'sophia.patel@email.com',
    coachId: COACH_IDS.COACH_3,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Nutrition coaching for diabetes management. Registered dietitian consultation recommended.',
    createdAt: new Date('2024-01-08')
  },
  {
    id: '22',
    name: 'Marcus Johnson',
    phone: '+1-555-0122',
    email: 'marcus.johnson@email.com',
    coachId: COACH_IDS.COACH_3,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Basketball player. Focus on agility, speed, and vertical jump training.',
    createdAt: new Date('2024-02-22')
  },
  {
    id: '23',
    name: 'Isabella Rodriguez',
    phone: '+1-555-0123',
    email: 'isabella.rodriguez@email.com',
    coachId: COACH_IDS.COACH_2,
    status: CLIENT_STATUS.PROSPECT,
    notes: 'Interested in prenatal fitness. First-time mother, needs gentle guidance.',
    createdAt: new Date('2024-03-01')
  },
  {
    id: '24',
    name: 'Thomas Kim',
    phone: '+1-555-0124',
    email: 'thomas.kim@email.com',
    coachId: COACH_IDS.COACH_1,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'CrossFit enthusiast. Working on Olympic lifting technique.',
    createdAt: new Date('2024-01-14')
  },
  {
    id: '25',
    name: 'Olivia Thompson',
    phone: '+1-555-0125',
    email: 'olivia.thompson@email.com',
    coachId: COACH_IDS.COACH_3,
    status: CLIENT_STATUS.ACTIVE,
    notes: 'Senior fitness specialist. Focus on mobility, balance, and fall prevention.',
    createdAt: new Date('2024-02-28')
  }
];


 
export const getActiveClients = (): Client[] => {
  return dummyClients.filter(client => client.status === CLIENT_STATUS.ACTIVE);
};


export const getClientsByCoach = (coachId: string): Client[] => {
  return dummyClients.filter(client => client.coachId === coachId);
};


export const getClientsByStatus = (status: typeof CLIENT_STATUS[keyof typeof CLIENT_STATUS]): Client[] => {
  return dummyClients.filter(client => client.status === status);
};


export const searchClients = (query: string): Client[] => {
  const lowercaseQuery = query.toLowerCase();
  return dummyClients.filter(client => 
    client.name.toLowerCase().includes(lowercaseQuery) ||
    client.email?.toLowerCase().includes(lowercaseQuery)
  );
};


export const getClientStats = () => {
  const total = dummyClients.length;
  const active = dummyClients.filter(c => c.status === CLIENT_STATUS.ACTIVE).length;
  const inactive = dummyClients.filter(c => c.status === CLIENT_STATUS.INACTIVE).length;
  const prospects = dummyClients.filter(c => c.status === CLIENT_STATUS.PROSPECT).length;

  return {
    total,
    active,
    inactive,
    prospects,
    activePercentage: Math.round((active / total) * 100),
    conversionRate: Math.round((active / (active + prospects)) * 100)
  };
};


export const getRecentClients = (): Client[] => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  
  return dummyClients.filter(client => client.createdAt >= thirtyDaysAgo);
};


export const validateClient = (client: Partial<Client>): boolean => {
  const requiredFields = ['id', 'name', 'phone', 'coachId', 'status', 'createdAt'];
  return requiredFields.every(field => client.hasOwnProperty(field));
};


export const clientData = {
  all: dummyClients,
  active: getActiveClients(),
  prospects: getClientsByStatus(CLIENT_STATUS.PROSPECT),
  stats: getClientStats(),
  recent: getRecentClients()
}; 


export const getCoachPerformance = () => {
  const coachStats = Object.values(COACH_IDS).map(coachId => {
    const clients = getClientsByCoach(coachId);
    const active = clients.filter(c => c.status === CLIENT_STATUS.ACTIVE).length;
    const total = clients.length;
    
    return {
      coachId,
      totalClients: total,
      activeClients: active,
      retentionRate: total > 0 ? Math.round((active / total) * 100) : 0,
      avgClientAge: Math.round(clients.reduce((sum, c) => {
        const age = (new Date().getTime() - c.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        return sum + age;
      }, 0) / total)
    };
  });
  
  return coachStats;
};


export const getClientSegments = () => {
  const segments = {
    fitness: dummyClients.filter(c => c.notes?.toLowerCase().includes('fitness') || c.notes?.toLowerCase().includes('strength')),
    nutrition: dummyClients.filter(c => c.notes?.toLowerCase().includes('nutrition') || c.notes?.toLowerCase().includes('meal')),
    wellness: dummyClients.filter(c => c.notes?.toLowerCase().includes('wellness') || c.notes?.toLowerCase().includes('stress')),
    sports: dummyClients.filter(c => c.notes?.toLowerCase().includes('athlete') || c.notes?.toLowerCase().includes('training')),
    seniors: dummyClients.filter(c => c.notes?.toLowerCase().includes('senior') || c.notes?.toLowerCase().includes('mobility')),
    prenatal: dummyClients.filter(c => c.notes?.toLowerCase().includes('prenatal') || c.notes?.toLowerCase().includes('pregnancy'))
  };
  
  return Object.entries(segments).map(([type, clients]) => ({
    type,
    count: clients.length,
    percentage: Math.round((clients.length / dummyClients.length) * 100)
  }));
};


export const getClientLifecycle = () => {
  const now = new Date();
  const lifecycle = {
    new: dummyClients.filter(c => (now.getTime() - c.createdAt.getTime()) < 30 * 24 * 60 * 60 * 1000),
    established: dummyClients.filter(c => {
      const days = (now.getTime() - c.createdAt.getTime()) / (24 * 60 * 60 * 1000);
      return days >= 30 && days < 180;
    }),
    longTerm: dummyClients.filter(c => (now.getTime() - c.createdAt.getTime()) >= 180 * 24 * 60 * 60 * 1000)
  };
  
  return lifecycle;
};


export const generateClientReport = () => ({
  summary: getClientStats(),
  coachPerformance: getCoachPerformance(),
  segments: getClientSegments(),
  lifecycle: getClientLifecycle(),
  topCoaches: getCoachPerformance().sort((a, b) => b.retentionRate - a.retentionRate).slice(0, 3),
  recentActivity: getRecentClients().length
});


export const sanitizeClientData = (client: Partial<Client>): Partial<Client> => {
  return {
    ...client,
    name: client.name?.trim(),
    email: client.email?.toLowerCase().trim(),
    phone: client.phone?.replace(/\s+/g, ''),
    notes: client.notes?.trim()
  };
};


export const clientAnalytics = {
  performance: getCoachPerformance,
  segments: getClientSegments,
  lifecycle: getClientLifecycle,
  report: generateClientReport
};

export const clientManagement = {
  search: searchClients,
  filter: {
    byCoach: getClientsByCoach,
    byStatus: getClientsByStatus,
    active: getActiveClients,
    recent: getRecentClients
  },
  validate: validateClient,
  sanitize: sanitizeClientData
}; 