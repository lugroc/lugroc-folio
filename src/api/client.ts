const API_URL = import.meta.env.VITE_API_URL || '/api';
const AUTH = `${API_URL}/auth`;

export async function checkBackendOnline(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);
    await fetch(`${API_URL}/auth/validate/ping`, { method: 'HEAD', signal: controller.signal, mode: 'cors' });
    clearTimeout(timeout);
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
  const result = await res.json();
  return result.sessionId;
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

export interface Product {
  id: number;
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
}

function authHeaders(): Record<string, string> {
  const sid = localStorage.getItem('sessionId');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (sid) headers['X-Session-Id'] = sid;
  return headers;
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${AUTH}/products`, { headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${AUTH}/products`, {
    method: 'POST', headers: authHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to create product');
  return res.json();
}

export async function updateProduct(id: number, product: Partial<Product>): Promise<Product> {
  const res = await fetch(`${AUTH}/products/${id}`, {
    method: 'PUT', headers: authHeaders(),
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error('Failed to update product');
  return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
  const res = await fetch(`${AUTH}/products/${id}`, { method: 'DELETE', headers: authHeaders() });
  if (!res.ok) throw new Error('Failed to delete product');
}

export async function searchProducts(name: string): Promise<Product[]> {
  const res = await fetch(`${AUTH}/products/search?name=${encodeURIComponent(name)}`, {
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error('Failed to search products');
  return res.json();
}

export async function sendContact(name: string, email: string, message: string): Promise<void> {
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL || `${AUTH}/contact`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
    signal: controller.signal,
  });
  clearTimeout(timeout);
  if (!res.ok) throw new Error('Failed to send message');
}
