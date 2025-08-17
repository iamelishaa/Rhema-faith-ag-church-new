// Helper function to get the correct image path
export const getImagePath = (imageName: string): string => {
  // In both production and development, use the images path
  return `/images/${imageName}`;
};

// Predefined image paths
export const IMAGES = {
  logo: getImagePath("logo.png"),
  profile: getImagePath("profile.png"),
  pastor: getImagePath("pastor.png"),
  pastorFamily: getImagePath("pastor-family.jpg"),
  placeholder: getImagePath("placeholder.jpg"),
};
