// locationUtils.ts
const getUserLocation = (): Promise <any>=> {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                try {
                    const { latitude, longitude } = pos.coords;
                    const apiKey = "a9e87d92b47747bf855172142252304"; 
                    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`);
                    const data = await res.json();                   
                    console.log("Detected city:", data.location.name);

                    resolve(data.location.name);
                } catch (error) {
                    reject(error);
                }
                    
            }
        );
    });
}
export default getUserLocation;


  