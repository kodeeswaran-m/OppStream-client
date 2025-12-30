import axios from "../utils/axiosInstance";

export const generateSummaryFromNotes = async (detailedNotes: string) => {
  try {
    console.log("detailed notes", detailedNotes);

    const response = await axios.post("/api/summary/generate-summary", {
      detailedNotes,
    });

    console.log("res.data", response.data);
    return response.data as { summary: string };
  } catch (error: any) {
    // Axios-specific error handling
    if (error.response) {
      console.error(
        "API error:",
        // error.response.status,
        error.response.data?.message
      );
      throw new Error(
        error.response.data?.message || "Failed to generate summary"
      );
    }

    // Network / unexpected error
    console.error("Unexpected error:", error.message);
    throw new Error("Something went wrong. Please try again later.");
  }
};



// import axios from "../utils/axiosInstance";

// export const generateSummaryFromNotes = async (detailedNotes: string) => {
//   console.log("detailed notes", detailedNotes);

//   const response = await axios.post("/api/summary/generate-summary", {
//     detailedNotes,
//   });

//   console.log("res.data", response.data);
//   return response.data as { summary: string };
// };
