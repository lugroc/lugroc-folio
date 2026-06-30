const firstNames = [
  'Alex', 'Jordan', 'Taylor', 'Morgan', 'Riley', 'Avery', 'Quinn',
  'Cameron', 'Dakota', 'Parker', 'Reese', 'Skyler', 'Drew', 'Casey',
  'Logan', 'Hunter', 'Carter', 'Wyatt', 'Landon', 'Ethan', 'Noah',
  'Liam', 'Mason', 'Lucas', 'Oliver', 'Elijah', 'James', 'Benjamin',
  'Sebastian', 'Jack', 'Owen', 'Theo', 'Henry', 'Leo', 'Ezra',
];

const lastNames = [
  'Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor',
  'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin', 'Lee',
  'Walker', 'Hall', 'Allen', 'Young', 'King', 'Wright', 'Hill',
  'Scott', 'Green', 'Adams', 'Baker', 'Rivera', 'Campbell', 'Mitchell',
  'Carter', 'Roberts', 'Phillips', 'Evans', 'Turner', 'Parker', 'Collins',
];

const domains = [
  'gmail.com', 'outlook.com', 'yahoo.com', 'proton.me',
  'icloud.com', 'hotmail.com', 'mail.com', 'fastmail.com',
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomUser() {
  const first = pick(firstNames);
  const last = pick(lastNames);
  const domain = pick(domains);
  const suffix = Math.floor(Math.random() * 9999);
  return {
    firstName: first,
    lastName: last,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${suffix}@${domain}`,
  };
}
