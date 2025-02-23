import axios, { AxiosResponse } from "axios";
import { GetFriendResponse, GetFriendRequestResponse, GetFriendMessageResponse } from "../types/Friend";

const BASE_URL = "http://127.0.0.1:8000/friend";

export async function getFriends(token : string): Promise<GetFriendResponse> {
  const response: AxiosResponse<GetFriendResponse> = await axios.get(`${BASE_URL}/friend`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  return response.data;
}

export async function getFriendsRequest(token : string): Promise<GetFriendRequestResponse> {
    const response: AxiosResponse<GetFriendRequestResponse> = await axios.get(`${BASE_URL}/friend/request`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        })
    return response.data;
}

export async function acceptFriendsRequest(token : string, respondentId : number): Promise<GetFriendMessageResponse> {
    const req = {respondentId : respondentId}
    try {
        const response: AxiosResponse<GetFriendMessageResponse> = await axios.post(`${BASE_URL}/acceptRequest`, req, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data) {
            return error.response.data;
        } else {
            throw error;
        }
    }
}

export async function declineFriendsRequest(token : string, respondentId : number): Promise<GetFriendMessageResponse> {
    const req = {respondentId : respondentId}
    try {
        const response: AxiosResponse<GetFriendMessageResponse> = await axios.post(`${BASE_URL}/declineRequest`, req, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data) {
            return error.response.data;
        } else {
            throw error;
        }
    }
}

export async function sendFriendsRequest(token : string, respondentId : number): Promise<GetFriendMessageResponse> {
    const req = {respondentId : respondentId}
    try {
        const response: AxiosResponse<GetFriendMessageResponse> = await axios.post(`${BASE_URL}/sendRequest`, req, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error: any) {
        if (error.response.data) {
            return error.response.data;
        } else {
            throw error;
        }
    }
}
