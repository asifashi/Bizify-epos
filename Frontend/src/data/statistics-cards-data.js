import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  BriefcaseIcon,
  RectangleGroupIcon,
  CloudArrowDownIcon,
  BuildingLibraryIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentListIcon,
  WalletIcon,
  TicketIcon,
  NewspaperIcon,
 
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import axios from "axios";
import { dividerClasses } from "@mui/material";

import { Spinner } from 'flowbite-react';

const StatisticsCardData = (selectedOption, customDateRange) => {
  const [totalGrossAmount, setTotalGrossAmount] = useState(0);
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [totalCashb, setTotalCashb] = useState(0);
  const [totalbankb, setTotalbankb] = useState(0);

  useEffect(() => {
    // Fetch total gross amount based on selected date range
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/getTotalGrossAmount', {
          params: {
            selectedOption,
            startDate: customDateRange.startDate,
            endDate: customDateRange.endDate,
          },
        });

        const { totalGrossAmount, totalPurchases, cashBalance, bankBalance } = response.data;
        setTotalGrossAmount(totalGrossAmount);
        setTotalPurchases(totalPurchases);
        setTotalCashb(cashBalance);
        setTotalbankb(bankBalance)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedOption, customDateRange]);

 
  const statisticsCardsData = [
    {
      color: "orange",
      icon: ChartBarIcon,
      title: "Sales",
      value: totalGrossAmount,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
    {
      color: "green",
      icon: BriefcaseIcon,
      title: "Purchases",
      value: totalPurchases,
      footer: {
        color: "text-red-500",
        value: "-2%",
        label: "than yesterday",
      },
    },
  

   
    {
      color: "blue",
      icon: BanknotesIcon,
      title: "Cash",
      value: totalCashb,
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
 
    
    {
      color: "pink",
      icon: BuildingLibraryIcon,
      title: "Bank",
      value: totalbankb,
      footer: {
        color: "text-green-500",
        value: "+55%",
        label: "than last week",
      },
    },
  ];
  const formattedStatisticsCardsData = statisticsCardsData.map((card) => {
    const formattedValue = card.value.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
  
    return {
      ...card,
      value: formattedValue,
    };
    
  });
 
 
 return formattedStatisticsCardsData;
};

export default StatisticsCardData;
