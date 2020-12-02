export const localModule = () => {
  const setStatus = (data) => {
    localStorage.setItem('status', JSON.stringify(data));
  };

  const getStatus = () => {
    const status = localStorage.getItem('status');
    if (status) {
      return JSON.parse(status);
    }

    return false;
  };

  return {
    setStatus,
    getStatus
  };
};

export default localModule;