export interface IBook {
  _id: string;
  createdAt: string;
  description: string;
  reason: string;
  review: number;
  status: '申請中' | '読了';
  title: string;
  updatedAt: string;
  url: string;
  username: string;
  affiliateUrl: string;
}