export const Translation = {
  async list(order = '-created_date') {
    // Returns sample data in-memory; replace with real API/storage
    const stored = JSON.parse(localStorage.getItem('translations') || '[]');
    return stored.sort((a,b) => (a.created_at < b.created_at ? 1 : -1));
  },
  async create(item) {
    const stored = JSON.parse(localStorage.getItem('translations') || '[]');
    const withId = { id: Date.now(), ...item };
    stored.push(withId);
    localStorage.setItem('translations', JSON.stringify(stored));
    return withId;
  }
};
