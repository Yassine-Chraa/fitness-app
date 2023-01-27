import { ActivityContextProvider } from "./providers/ActivityContext";
import { UserContextProvider } from "./providers/UserContext";
import { EquipmentContextProvider } from "./providers/EquipmentContext";
import { MealContextProvider } from "./providers/MealContext";
import { ProductContextProvider } from "./providers/ProductContext";
import { Composer } from "./Composer";
import { authContextProvider } from "./providers/AuthContext";

const providers = [
    ActivityContextProvider,
    UserContextProvider,
    EquipmentContextProvider,
    MealContextProvider,
    ProductContextProvider,
    authContextProvider,
];

export const APIHandlerProvider = Composer(...providers);
