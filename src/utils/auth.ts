export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string // In production, this would be hashed
}

const USERS_STORAGE_KEY = 'healthEase_users'
const CURRENT_USER_KEY = 'healthEase_currentUser'

// Get all users from localStorage
export function getUsers(): User[] {
  const usersJson = localStorage.getItem(USERS_STORAGE_KEY)
  return usersJson ? JSON.parse(usersJson) : []
}

// Save users to localStorage
function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

// Register a new user
export function registerUser(userData: {
  firstName: string
  lastName: string
  email: string
  password: string
}): { success: boolean; error?: string } {
  const users = getUsers()
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === userData.email)
  if (existingUser) {
    return { success: false, error: 'User with this email already exists' }
  }
  
  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    ...userData,
  }
  
  users.push(newUser)
  saveUsers(users)
  
  return { success: true }
}

// Login user
export function loginUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  
  if (!user) {
    return { success: false, error: 'Invalid email or password' }
  }
  
  // Store current user
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  
  return { success: true, user }
}

// Get current logged in user
export function getCurrentUser(): User | null {
  const userJson = localStorage.getItem(CURRENT_USER_KEY)
  return userJson ? JSON.parse(userJson) : null
}

// Logout user
export function logoutUser(): void {
  localStorage.removeItem(CURRENT_USER_KEY)
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}

