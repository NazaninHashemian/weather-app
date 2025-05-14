// utils/getWeatherIcon.tsx
import { Condition } from "../types/weatherTypes";
import React, { ReactNode } from "react";

const getWeatherIcon = (
  condition: Condition | undefined,
  size: 'small' | 'large' = 'large'  // default is 'large'
) : ReactNode => {
    const iconUrl = condition?.icon;
    if (!iconUrl) return null;
    return (
      <div className={`icon-wrapper ${size}`}>
        <img 
          src={`https:${iconUrl}`} 
          alt={`Weather icon representing ${condition.text}`}
        />
      </div>
    );
};

export default getWeatherIcon;
