// Helper function to get the correct image path
export const getImagePath = (imageName: string): string => {
  // In production, use the public path
  if (process.env.NODE_ENV === 'production') {
    return `/_next/static/media/${imageName.replace(/\.[^/.]+$/, '')}.${imageName.split('.').pop()}`;
  }
  // In development, use the public path
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
