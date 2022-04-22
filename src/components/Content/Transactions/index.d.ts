export default interface ITransactions {
    transactions?: ITransactionsAPI
    campaigns?: ICampaignsAPI
  }

export interface IPage {
    length: number;
    now: number;
    total: number;
    limit: number;
}