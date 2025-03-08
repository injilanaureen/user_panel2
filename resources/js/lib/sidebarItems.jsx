import { LayoutDashboard, History, LogOut, Wallet,ChartCandlestick ,Scale ,Battery,IndianRupee ,BusFront ,TowerControl , HandCoins, WalletCards, ChartPie, BadgeSwissFranc , HeartCrack,Cable ,TabletSmartphone ,HouseWifi ,Newspaper ,Bus ,BadgeIndianRupee  ,BadgeRussianRuble  } from 'lucide-react';

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
        "text": "Bus Booking",
        "icon": <BusFront/>,
        "children": [
          {
              "text": "Get Source City",
              "route": "/admin/busTicket/getSourceCity"
            },
          {
            "text": "Get Available Trip",
            "route": "/admin/busTicket/getAvailableTrip"
          },
          {
            "text": "Get Current Trip Details",
            "route": "/admin/busTicket/getCurrentTripDetails"
          },
          {
              "text": "Book Tickets",
              "route": "/admin/busTicket/bookTicket"
            },
            {
              "text": "Get Boarding Point Details",
              "route": "/admin/busTicket/getBoardingPointDetails"
            },
            {
              "text": "Check Booked Tickets",
              "route": "/admin/busTicket/checkBookedTickets"
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
        "text": "DMT BANK 1",
        "icon": <IndianRupee />,
        "children": [
          {
            "text": "Remitter",
            "children": [
              {
                "text": "Query Remitter",
                "route": "/admin/remitter1/queryRemitter"
              },
              {
                "text": "Remitter E-KYC",
                "route": "/admin/remitter1/remitterEKYC"
              },
              {
                "text": "Register Remitter",
                "route": "/admin/remitter1/registerRemitter"
              }
            ]
          },
          {
            "text": "Beneficiary",
            "children": [
              {
                "text": "Register Beneficiary",
                "route": "/admin/beneficiary1/registerBeneficiary"
              },
              {
                "text": "Delete Beneficiary",
                "route": "/admin/beneficiary1/deleteBeneficiary"
              },
              {
                "text": "Fetch Beneficiary",
                "route": "/admin/beneficiary1/FetchBeneficiary"
              },            
              {
                "text": "Fetch Beneficiary By Benied",
                "route": "/admin/beneficiary1/FetchBeneficiaryByBenied"
              }
              
            ]
          },
          {
            "text": "Transaction",
            "icon": <Battery/>,
            "children": [
              {
                "text": "Penny Drop",
                "route": "/admin/transaction1/pennyDrop"
              },
              {
                "text": "Transaction Sent Otp",
                "route": "/admin/transaction1/transactionOtp"
              },
              {
                "text": "Transaction",
                "route": "/admin/transaction1/transaction"
              },
              {
                "text": "Transaction Status",
                "route": "/admin/transaction1/transactionStatus"
              }
            ]
          },
          {
            "text": "Refund",
            "icon": <Battery/>,
            "children": [
              {
                "text": "Refund Otp",
                "route": "/admin/refund1/refundOtp"
              },
              {
                "text": "Claim Refund",
                "route": "/admin/refund1/claimRefund"
              }
            ]
          }
        ]
      },
      {
        "text": "DMT BANK 2",
        "icon": <IndianRupee/>,
        "children": [
          {
            "text": "Remitter",
            "children": [
              {
                "text": "Query Remitter",
                "route": "/admin/remitter2/queryRemitter"
              },
              {
                "text": "Remitter Aadhar verify API",
                "route": "/admin/remitter2/remitterAdhaarVerifyApi"
              },
              {
                "text": "Register Remitter",
                "route": "/admin/remitter2/registerRemitter"
              }
            ]
          },
          {
            "text": "Beneficiary",
            "children": [
              {
                "text": "Register Beneficiary",
                "route": "/admin/beneficiary2/registerBeneficiary"
              },
              {
                "text": "Delete Beneficiary",
                "route": "/admin/beneficiary2/deleteBeneficiary"
              },
              {
                "text": "Fetch Beneficiary",
                "route": "/admin/beneficiary2/fetchBeneficiary"
              },
              {
                "text": "Fetch Beneficiary By Benied",
                "route": "/admin/beneficiary2/fetchbyBenied"
              }
            ]
          },
          {
            "text": "Transaction",
            "icon": <Battery/>,
            "children": [
              {
                "text": "Penny Drop",
                "route": "/admin/transaction2/pennyDrop"
              },
              {
                "text": "Transaction Sent Otp",
                "route": "/admin/transaction2/transactionSentOtp"
              },
              {
                "text": "Transaction",
                "route": "/admin/transaction2/transaction"
              },
              {
                "text": "Transaction Status",
                "route": "/admin/transaction2/transactionStatus"
              }
            ]
          },
          {
            "text": "Refund",
            "icon": <Battery/>,
            "children": [
              {
                "text": "Refund Otp",
                "route": "/admin/refund2/refundOtp"
              },
              {
                "text": "Claim Refund",
                "route": "/admin/refund2/claimRefund"
              }
            ]
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
    },
    {
      "text": "Utilities",
      "icon": <Battery/>,
      "children": [
        {
          "text": "Bill Payment",
          "children": [
            {
              "text": "Operator List",
              "route": "/admin/utility-bill-payment/operator-list"
            },
            {
              "text": "Fetch Bill Details",
              "route": "/admin/utility-bill-payment/fetch-bill-details"
            },
            {
              "text": "Pay Bill",
              "route": "/admin/utility-bill-payment/pay-bill"
            },
            {
              "text": "Status Enquiry",
              "route": "/admin/utility-bill-payment/utility-status-enquiry"
            }
          ]
        },
        {
          "text": "Insurance  Payment",
          "children": [
            {
              "text": "Fetch Insurance Bill Details",
              "route": "/admin/InsurancePremiumPayment/FetchInsuranceBillDetails"
            },
            {
              "text": "Pay Insurance Bill",
              "route": "/admin/InsurancePremiumPayment/PayInsuranceBill"
            },
            {
              "text": "Insurance Status Enquiry",
              "route": "/admin/InsurancePremiumPayment/InsuranceStatusEnquiry"
            }
           
          ]
        },
        {
          "text": "Fastag Recharge",
          "children": [
            {
              "text": "Operator List",
              "route": "/admin/FastagRecharge/FastagOperatorList"
            },
            {
              "text": "Fetch Consumer Details",
              "route": "/admin/FastagRecharge/fetchConsumerDetails"
            },
            {
              "text": "Recharge",
              "route": "/admin/FastagRecharge/fastagRecharge"
            },
             {
              "text": "Status",
              "route": "/admin/FastagRecharge/FastagStatus"
            }
           
          ]
        },
        {
          "text": "LPG Booking & Payment",
          "children": [
            {
              "text": "Operator List",
              "route": "/admin/LPG/LPGOperator"
            },
            {
              "text": "Fetch LPG Details",
              "route": "/admin/LPG/LPGDetails"
            }
            ,
            {
              "text": "Pay Bill",
              "route": "/admin/LPG/LPGBill"
            },
            {
              "text": "Status",
              "route": "/admin/LPG/LPGStatus"
            }
            
           
          ]
        },
        {
          "text": "Municipality Payment",
          "children": [
            {
              "text": "Operator List",
              "route": "/admin/Municipality/MunicipalityOperator"
            },
            {
              "text": "Fetch Municipality Details",
              "route": "/admin/Municipality/FetchMunicipalityDetails"
            }
            ,
            {
              "text": "Pay Bill",
              "route": "/admin/Municipality/MunicipalityBill"
            },
            {
              "text": "Status",
              "route": "/admin/Municipality/MunicipalityStatus"
            }
            
           
          ]
        }
      ]
    }
]


export default sidebarItems;
