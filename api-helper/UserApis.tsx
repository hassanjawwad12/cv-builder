import createApiInstance from "./ApiInstance";

export const getCustomerDataApi = async (
  token: string | undefined
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.get(`api/customer/get`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editCustomerNameApi = async (
  token: string | undefined,
  name: string
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.put("api/customer/edit-name", {
      name: name,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editCustomerPhoneApi = async (
  token: string | undefined,
  phone: string
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.put("api/customer/edit-phone", {
      phone: phone,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCustomerBuilds = async (
  token: string | undefined
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.get(`api/customer/get-builds`);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const editCustomerImageApi = async (
  token: string | undefined,
  image: string
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.put("api/customer/edit-image", {
      image: image,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
