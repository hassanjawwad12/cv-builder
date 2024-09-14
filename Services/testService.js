export const testService = async () => {
  try {
    const data = "test service is called..";
    return {
      data: data,
      error: false,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      error: error,
      status: 500,
    };
  }
};
