export interface Bid {
  productId: string;
  timeStamp: Date;
  userId: string;
  bid: number;
}

export interface BidProduct {
  bidId: string;
  newBid: number;
  user: string;
}

export interface BidUser {
  bidId: string;
  newBid: number;
  product: string;
}
