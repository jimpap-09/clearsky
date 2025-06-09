import axios from 'axios';
import { get_instructor_pending_review_request_url, get_instructor_review_request_url } from "../apiConfig";

export const fetchInstructorReviewRequests = async (instructorId, token) => {
    console.log('authorization token: ', token);

  try {
    const res = await axios.get(`${get_instructor_review_request_url}/${instructorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Failed to fetch instructor review requests', err);
    return []; // για να μην σκάσει το React component
  }
};

export const fetchInstructorPendingReviewRequests = async (instructorId, token) => {
    console.log('authorization token: ', token);
    console.log('instructorId: ', instructorId);

  try {
    const res = await axios.get(`${get_instructor_pending_review_request_url}/${instructorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error('Failed to fetch instructor review requests', err);
    return []; // για να μην σκάσει το React component
  }
};
