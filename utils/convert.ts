export const convertImageToBase64 = async (file: File): Promise<string> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    // Event listener for successful file reading
    reader.onloadend = () => {
      const response = reader.result as string;
      resolve(response.slice(response.indexOf(",") + 1)); // The base64 string is in reader.result
    };

    // Convert the file to a Base64 string
    reader.readAsDataURL(file);
  });
