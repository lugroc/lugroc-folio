const API_URL = import.meta.env.VITE_API_URL || '/api';
const AUTH = `${API_URL}/auth`;

export async function checkBackendOnline(): Promise<boolean> {
  try {
    await fetch(`${API_URL}/auth/validate/ping`, { method: 'HEAD', signal: AbortSignal.timeout(3000) });
    return true;
  } catch {
    return false;
  }
}

export async function login(email: string, password: string): Promise<string> {
  const res = await fetch(`${AUTH}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  const data = await res.json();
  return data.sessionId;
}

export async function register(firstName: string, lastName: string, email: string, password: string): Promise<void> {
  const res = await fetch(`${AUTH}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
}

export async function validateSession(sessionId: string) {
  const res = await fetch(`${AUTH}/validate/${sessionId}`);
  return res.json();
}

export async function logout(sessionId: string): Promise<void> {
  await fetch(`${AUTH}/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId }),
  });
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export async function getCustomer(id: number): Promise<Customer> {
  const res = await fetch(`${AUTH}/customer/${id}`);
  if (!res.ok) throw new Error('Failed to fetch customer');
  return res.json();
}

export async function sendContact(name: string, email: string, message: string): Promise<void> {
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL || `${AUTH}/contact`;
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });
  if (!res.ok) throw new Error('Failed to send message');
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}
