import {Price} from "../../shared/price.type";

export type Product = {
    _id: string,
    name: string,
    costOfGood: Price,
    markup: number,
    type: ProductType,
};

export type ProductType =
    "Xemote Gateway" |
    "Xemote Accessory" |
    "Wireless Temperature Sensor" |
    "Wireless Humidity Sensor" |
    "Wireless AC Current Meter" |
    "Wireless Event-Based Sensor" |
    "Wireless Infrared Beam Sensor" |
    "Wireless 4-30mA Sensor";

export const ProductsQueryParamKeys: string[] = [
    'idRegex',
    'costOfGoodRange',
    'markupRange',
    'type',
    'sort',
    'index',
    'limit',
];