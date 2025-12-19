import type { UserType } from "./magento";

/**
 * Dynamically load data based on user type
 */
export async function loadDataForUserType(userType: UserType) {
  if (userType === "particulierWithoutZeno") {
    return await import("../dummyData/particulierWithoutZeno");
  } else if (userType === "interneUrmet") {
    return await import("../dummyData/interneUrmet");
  }

  // Default fallback
  return await import("../dummyData/particulierWithoutZeno");
}
