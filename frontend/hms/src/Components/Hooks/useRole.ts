export const useRole = () => {
    // Mocked role for now
    const role = localStorage.getItem('role') || 'admin';
  
    const can = (allowed: string[]) => allowed.includes(role);
  
    return { role, can };
  };
  