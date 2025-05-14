// utils/getBackgroundImageByCondition.tsx
const getBackgroundImageByCondition = (
    conditionText: string,
    isDay: boolean
  ): string => {
    const condition = conditionText.toLowerCase();
    const isNight = !isDay;
    const base = import.meta.env.BASE_URL;
  
    if (isNight) {
      if (condition.includes('rain') || condition.includes('drizzle')) {
        return `${base}Images/Subtle-night.jpeg`;
      } else if (condition.includes('storm') || condition.includes('thunder')) {
        return `${base}Images/Stormy-night.jpeg`;
      } else if (condition.includes('cloud') || 
        condition.includes('overcast') || condition.includes('mist') || condition.includes('fog')){
        return `${base}Images/Cloudy-night.jpeg`;
      } else if (condition.includes('clear') ){
        return `${base}Images/Clear-night.jpg`;
      } else if (condition.includes('snow') ){
        return `${base}Images/Snow-night.jpeg`;
      } 
      else {
        return `${base}Images/Cloudy-night.jpeg`;
      }
    } else {
      if (condition.includes('sunny') || condition.includes('clear')) {
        return `${base}Images/Sunny-sky.jpg`;
      } else if (condition.includes('rain') || condition.includes('drizzle')) {
        return `${base}Images/Rainy-sky.jpg`;
      } else if (condition.includes('storm') || condition.includes('thunder')) {
        return `${base}Images/Stormy-sky.jpg`;
      } else if (condition.includes('cloud') || condition.includes('overcast') || 
        condition.includes('mist') || condition.includes('fog')) {
        return `${base}Images/Cloudy-sky.jpg`;
      } else {
        return `${base}Images/Cloudy-sky.jpg`;
      }
    }
  };
  
  export default getBackgroundImageByCondition;
  