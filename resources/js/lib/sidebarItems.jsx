import { LayoutDashboard, History, LogOut, Wallet,ChartCandlestick ,Scale ,TowerControl , HandCoins, WalletCards, ChartPie, BadgeSwissFranc , HeartCrack,Cable ,TabletSmartphone ,HouseWifi ,Newspaper ,Bus ,BadgeIndianRupee  ,BadgeRussianRuble  } from 'lucide-react';

const sidebarItems = 
[
    {
        "text": "DashBoard",
        "icon": <LayoutDashboard />,
        "bg_color": "bg-cyan-400",
        "route": "/"
    },
    
    {
        "text": "UPI Services",
        "icon": <History/>,
        "bg_color": "bg-orange-400",
        "children": [
            {
                "text": "UPI Transactions",
                "route": "/upi/transactions",
                "icon": <Newspaper/>,
            },
            {
                "text": "UPI Dashboard",
                "route": "/upi/dashboard",
                "icon": <ChartPie/>,
            },
            {
                "text": "UPI Dispute Settlement",
                "route": "/upi/dispute",
                "image": <HeartCrack/>
            },
            {
                "text": "UPI Profit Report",
                "route": "/upi/profit",
                "icon": <WalletCards/>
            }
        ]
    },

    {
        "text": "Recharge",
        "icon": <Cable/>,
        "bg_color": "bg-red-500",
        "route": "",
        "children": [
          {
            "text": "Mobile Recharge",
            "route": "/recharge/mobilerecharge",
            "icon": <TabletSmartphone />,
          },
          {
            "text": "DTH Recharge",
            "route": "/recharge/dthrecharge",
            "icon": <HouseWifi/>,
          },
         
        ]
      },
      
    {
        "text":"API Service",
        "icon": <HouseWifi/>,
        "bg_color": "bg-green-400",

        "children": [
            {
                "text": "BUS API",
                "route": "/api/bus",
                "icon": <Bus/>,
            },
            {
                "text": "LIC API",
                "route": "/api/lic",
                "icon": <HandCoins/>,
            }
           
        ]
    },
    {
        "text":"CMS",
        "icon": <HouseWifi/>,
        "bg_color": "bg-green-400",
        "children": [
            {
                "text": "Airtel CMS",
                "route": "/cms/airtel",
                "icon": <TowerControl/>,
            },
            {
                "text": "Fino CMS",
                "route": "/cms/fino",
                "icon": <HandCoins/>,
            }
        ]
    },


{
    "text": "My Commision Slab",
    "icon": <BadgeIndianRupee/>,
    "bg_color": "bg-rose-500",
    "route": "/commission",
},



    {
        "text": "Wallet System",
        "icon": <Wallet/>,
        "bg_color": "bg-cyan-500",
        "route": "/wallet",
        "children": [
            {
                "text": "Make Fund Request",
                "route": "/wallet/fundrequest",
                "icon": <ChartCandlestick />,
            }
        ]
    },

    {
        "text": "Reports",
        "icon": <ChartPie/>,
        "bg_color": "bg-teal-500",
        "route": "/reports",
        "children": [
            {
                "text": "E-Wallet Transaction",
                "route": "/reports/wallet-transaction",
                "icon": <BadgeRussianRuble/>,
            },
            {
                "text": "Recharge Transactions",
                "route": "/reports/recharge-transactions",
                "icon": <BadgeSwissFranc/>
            },
            {
                "text": "Dispute Settlement",
                "route": "/reports/dispute",
                "icon": <HeartCrack/>,
            },
            {
                "text": "My Commision Profit",
                "route": "/reports/commision",
                "icon": <WalletCards/>
            },
            {
                "text": "My Login details",
                "route": "/reports/login",
                "icon": <LogOut/>
            }
        ]
    }
]


export default sidebarItems;
