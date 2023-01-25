import { ActivityContextProvider } from "../Context/ActivityContext";
import { UserContextProvider } from "../Context/UserContext";
import { EquipmentContextProvider } from "../Context/EquipmentContext";
import { MealContextProvider } from "../Context/MealContext";
import { ProductContextProvider } from "../Context/ProductContext";
import { Composer } from "./Composer";

const providers = [
    ActivityContextProvider,
    UserContextProvider,
    EquipmentContextProvider,
    MealContextProvider,
    ProductContextProvider,
];

export const APIHandlerProvider = Composer(...providers);
