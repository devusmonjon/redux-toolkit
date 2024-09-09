export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString());
      } else {
        reject("Failed to convert image to Base64");
      }
    };

    reader.onerror = (error) => reject(error);
  });
}
