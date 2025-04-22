export interface Course {
    id: number;
    title: string;
    category: string;
    startDate: string;
    endDate: string;
    applicationDeadline: string;
    maxParticipants: number;
    currentParticipants: number;
    status: 'OPEN' | 'CLOSED' | 'IN_PROGRESS' | 'COMPLETED';
}

export interface ApplicationStatus {
    courseId: number;
    userId: number;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
    appliedAt: string;
}
