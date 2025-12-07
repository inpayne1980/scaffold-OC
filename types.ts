// Enums based on DB schema
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin'
}

export enum BillingInterval {
  MONTH = 'month',
  YEAR = 'year'
}

export enum SubscriptionStatus {
  ACTIVE = 'active',
  TRIALING = 'trialing',
  CANCELED = 'canceled'
}

// Data Models
export interface User {
  uuid: string;
  email: string;
  role: UserRole;
  created_at: string;
}

export interface Profile {
  uuid: string;
  user_id: string;
  display_name: string;
  avatar_url: string;
}

export interface Plan {
  uuid: string;
  name: string;
  price: number;
  billing_interval: BillingInterval;
  features: string[];
}

export interface Subscription {
  uuid: string;
  user_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  current_period_end: string;
}

export interface ApiKey {
  uuid: string;
  key: string;
  created_at: string;
  revoked: boolean;
}

export interface AuditLogEntry {
  uuid: string;
  action: string;
  target: string;
  created_at: string;
}

// Application State Context
export interface AppContextType {
  user: User | null;
  profile: Profile | null;
  subscription: Subscription | null;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}
