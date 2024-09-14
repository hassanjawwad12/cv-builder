import createApiInstance from "./ApiInstance";

export const subscribeToPlanApi = async (
  token: string | undefined,
  plan_id: any,
  success_url: any,
  cancel_url: any
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.post(
      "api/stripe/subscription-checkout-session",
      {
        plan_id: plan_id,
        success_url: success_url,
        cancel_url: cancel_url,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const atsFriendlyResumeApi = async (
  token: string | undefined,
  name: string,
  query: any
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.post("api/create-ats/resume", {
      name: name,
      query: query,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const atsFriendlyTemplateApi = async (
  token: string | undefined,
  name: string,
  query: any
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.post("api/create-ats/template", {
      name: name,
      query: query,
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllResumeApi = async (
  token: string | undefined
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.get(
      "api/resume-template/get-all-resume-templates"
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSingleResumeApi = async (
  token: string | undefined,
  id: any
): Promise<any> => {
  const api = createApiInstance(token);

  try {
    const response = await api.get(
      `api/resume-template/get-single-resume-templates?id=${id}`
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
