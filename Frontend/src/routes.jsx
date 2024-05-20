import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  BookOpenIcon,
  WalletIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";
import Inventory from "./pages/dashboard/inventory";
import Brand from "./pages/dashboard/brand";
import Category from "./pages/dashboard/category";
import Group from "./pages/dashboard/group";
import Unit from "./pages/dashboard/unit";
import Deliver from "./pages/dashboard/deliverynote";
import Chartaccounts from "./pages/dashboard/chartaccounts";
import Quotation from "./pages/dashboard/quotation";
import Terms from "./pages/dashboard/paymentterms";



const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "Accounts",
       
        subpages: [
          { 
            name: "Chart Accounts",
            path: "/chartaccounts",
            element: <Chartaccounts/>
          },
        ],
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Inventory",

        subpages: [
          {
            name: "Category",
            path: "/category",
            element: <Category/>,
          },
          {
            name: "Group",
            path: "/group",
            element: <Group/>,
          },
          {
            name: "Brand",
            path: "/brand",
            element: <Brand/>,
          },
          {
            name: "Unit",
            path: "/unit",
            element: <Unit />,
          },
          {
            name: "Stock",
            path: "/stock",
            element: <Inventory/>,
          },
        ],
      },
      {  
        icon: <WalletIcon {...icon} />,
        name: "Accounts Entry",
       
        subpages: [
          {
            name: "Contra",
            path: "/contra",
            
          },
          {
            name: "Payment",
            path: "/payment",
            
          },
          {
            name: "Receipt",
            path: "/receipt",
           
          },
          {
            name: "Journal",
            path: "/journal",
           
          },
          {
            name: "Credit Note",
            path: "/credit-note",
           
          },
          {
            name: "Debit Note",
            path: "/debit-note",
           
          },
        ],
      },
   
    
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Sales",
      
        subpages: [
          { 
            name: "Customers",
            path: "/profile",
            element: <Profile />,
          },
          {
            name: "RFQ",
            path: "/rfq",
        
          },
          {
            name: "Quotation",
            path: "/quotation",
            element:<Quotation/>,
          },
          {
            name: "Sales Order",
            path: "/sales-order",
         
          },
          {
            name: "Delivery Note",
            path: "/delivery-note",
            element: <Deliver/>
          },
          {
            name: "Sales Invoice",
            path: "/sales",
            element: <Tables />,
       
          },
          {
            name: "Sales Return",
            path: "/sales-return",
         
          },
        ],
      },
      {
        icon: <BellIcon {...icon} />,
        name: "Report",
        path: "/report",
        element: <Notifications/>,
      },
      {
        icon: <Square3Stack3DIcon {...icon} />,
        name: "MIS Reports",
        path: "/misreport",
        element: <Notifications/>,
      },
      {
        icon: <Cog8ToothIcon {...icon} />,
        name: "Settings",
        subpages: [
          { 
            name: "Payment Terms",
            path: "/paymentterms",
            element:<Terms/>
          },
        ]
      },
    ],
  },
  {
    title: "auth pages",
    layout: "auth",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <UserPlusIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;



