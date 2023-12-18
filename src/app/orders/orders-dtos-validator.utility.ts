import {
    CreateOrderDTO,
    DeleteOrderDTO,
    GetOrderDTO,
    OrdersDTO,
    UpdateOrderDTO,
    UpdateOrdersDTO
} from "./orders-dtos.type";
import {OrdersRepository} from "./orders-repository.type";
import {ValidationOutcome} from "@hals/common";

export type OrdersDtosValidator = {
    validateGetOrderDto: (dto: GetOrderDTO) => Promise<ValidationOutcome>,
    validateOrdersDto: (dto: OrdersDTO) => Promise<ValidationOutcome>,
    validateCreateOrderDto: (dto: CreateOrderDTO) => Promise<ValidationOutcome>,
    validateUpdateOrderDto: (dto: UpdateOrderDTO) => Promise<ValidationOutcome>,
    validateUpdateOrdersDto: (dto: UpdateOrdersDTO) => Promise<ValidationOutcome>,
    validateDeleteOrderDto: (dto: DeleteOrderDTO) => Promise<ValidationOutcome>,
};

export const configureOrdersDtosValidator =
    (repository: OrdersRepository): OrdersDtosValidator => ({
        validateGetOrderDto: async (dto: GetOrderDTO): Promise<ValidationOutcome> => {
            if (!dto._id)
                return {error: {type: "BadRequest", message: 'ID required.'}};
            if (!(await repository.exists(dto)))
                return {error: {type: "NotFound", message: `Order "${dto._id}" not found.`}};
            return {};
        },

        validateOrdersDto: async (dto: OrdersDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateCreateOrderDto: async (dto: CreateOrderDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateUpdateOrderDto: async (dto: UpdateOrderDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateUpdateOrdersDto: async (dto: UpdateOrdersDTO): Promise<ValidationOutcome> => {
            return {};
        },

        validateDeleteOrderDto: async (dto: DeleteOrderDTO): Promise<ValidationOutcome> => {
            return {};
        },
    });
