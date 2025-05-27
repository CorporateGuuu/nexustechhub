// Firebase configuration stub for Nexus TechHub
// This is a placeholder file to prevent build errors

export const auth = null;
export const db = null;
export const storage = null;

// Placeholder functions
export const signInWithEmailAndPassword = () => Promise.reject('Firebase not configured');
export const createUserWithEmailAndPassword = () => Promise.reject('Firebase not configured');
export const signOut = () => Promise.reject('Firebase not configured');
export const onAuthStateChanged = () => () => {};

// Authentication functions
export const signUpWithEmail = async (email, password, userData = {}) => {
  console.log(`Firebase signUp: ${email}`);
  return {
    user: { uid: 'mock-uid', email, ...userData },
    error: null
  };
};

export const signInWithEmail = async (email, password) => {
  console.log(`Firebase signIn: ${email}`);
  return {
    user: { uid: 'mock-uid', email },
    error: null
  };
};

export const signOutUser = async () => {
  console.log('Firebase signOut');
  return { error: null };
};

// Firestore functions
export const getDocument = async (collection, docId) => {
  console.log(`Getting document ${docId} from ${collection}`);
  return {
    id: docId,
    data: { name: 'Mock Document', created_at: new Date().toISOString() },
    exists: true
  };
};

export const getDocuments = async (collection, filters = {}) => {
  console.log(`Getting documents from ${collection}`, filters);
  return {
    docs: [
      { id: 'doc1', data: { name: 'Document 1' } },
      { id: 'doc2', data: { name: 'Document 2' } }
    ],
    size: 2
  };
};

export const addDocument = async (collection, data) => {
  console.log(`Adding document to ${collection}`, data);
  return {
    id: `doc_${Date.now()}`,
    data,
    created_at: new Date().toISOString()
  };
};

export const updateDocument = async (collection, docId, data) => {
  console.log(`Updating document ${docId} in ${collection}`, data);
  return {
    id: docId,
    data,
    updated_at: new Date().toISOString()
  };
};

export const deleteDocument = async (collection, docId) => {
  console.log(`Deleting document ${docId} from ${collection}`);
  return { success: true };
};

export default {
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signUpWithEmail,
  signInWithEmail,
  signOutUser,
  getDocument,
  getDocuments,
  addDocument,
  updateDocument,
  deleteDocument
};
