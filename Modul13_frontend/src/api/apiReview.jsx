import useAxios from ".";

export const GetAllReviews = async () => {
    try {
      const response = await useAxios.get("/reviews", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  };

  export const GetMyReviews = async () => {
    const id = JSON.parse(sessionStorage.getItem("user")).id;
    try {
      const response = await useAxios.get(`/reviews/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const GetReviewsById = async (id) => {
    try {
      const response = await useAxios.get(`/reviews/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
  export const AddReviews = async (data) => {
    try {
      const response = await useAxios.post("/reviews", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
  
export const DeleteReviews = async (id) => {
    try {
  
      const response = await useAxios.delete(`/reviews/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
  
      return response.data;
    } catch (error) {
      if (error.response.status === 404) {
        throw new Error("Review not found");
      }
  
      throw new Error("Failed to delete review");
    }
};