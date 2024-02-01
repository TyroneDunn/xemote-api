import { Request } from "@hals/common";

export const logGetRequest = (id: string) => async (request: Request): Promise<void>  => {
   logRequest(id, "GET", request);
};

export const logCreateRequest = (id: string) => async (request: Request): Promise<void>  => {
   logRequest(id, "CREATE", request);
};

export const logPatchRequest = (id: string) => async (request: Request): Promise<void>  => {
   logRequest(id, "PATCH", request);
};

export const logDeleteRequest = (id: string) => async (request: Request): Promise<void>  => {
   logRequest(id, "DELETE", request);
};

const logRequest = (id: string, method: string, request : Request): void => {
   const logMessage =
      'Server Request\n' +
      `Timestamp: ${new Date().toISOString()}\n` +
      `ID: ${id}\n` +
      `Method: ${method}\n` +
      `Params: ${request.paramMap}\n` +
      `Query Params: ${request.queryParamMap}\n` +
      `Payload: ${request.payload}\n\n`
   console.log(logMessage);
};
