import {Request} from "@hals/core";

export const mapRequestToPage = (request: Request) => ({
    ...(request.queryParamMap['index'] && request.queryParamMap['limit']) && {
        page: {
            index: parseInt(request.queryParamMap['index']),
            limit: parseInt(request.queryParamMap['limit'])
        }
    },
});
