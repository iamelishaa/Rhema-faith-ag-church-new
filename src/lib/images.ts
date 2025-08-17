// Helper function to get the correct image path
export const getImagePath = (imageName: string): string => {
  // In development, use the path from the public directory
  if (process.env.NODE_ENV === 'development') {
    return `/images/${imageName}`;
  }
  // In production, use the path where images are copied during build
  return `/images/${imageName}`;
};

// Predefined image paths
export const IMAGES = {
  logo: getImagePath('logo.png'),
  profile: getImagePath('profile.png'),
  pastor: getImagePath('pastor.png'),
  pastorFamily: getImagePath('pastor-family.jpg'),
  placeholder: getImagePath('placeholder.jpg')
};
