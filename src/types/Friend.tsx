export interface Friend {
    id: number;
    fullname: string;
    email: string;
}

export interface GetFriendResponse {
    friends : Array<Friend>;
}

export interface GetFriendRequestResponse {
    friendRequests : Array<Friend>;
}

export interface GetFriendMessageResponse {
    message : string | null
    error : string | null
}