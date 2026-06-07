import {
  LuTrendingUp,
  LuTrendingDown,LuLogOut,
} from "react-icons/lu";
import { AiOutlineHome } from "react-icons/ai";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: AiOutlineHome,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuTrendingUp,
    path: "/income",
  },
  {
    id: "03",
    label: "Expenses",
    icon: LuTrendingDown,
    path: "/expense",
  },
  {
    id: "04",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },

];
