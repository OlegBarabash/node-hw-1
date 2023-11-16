const tryCatchWrapper = (ctrl) => {
  const fn = async (arg) => {
    try {
      return await ctrl(arg);
    } catch (error) {
      console.log(error.message);
    }
  };
  return fn;
};

export default tryCatchWrapper;
