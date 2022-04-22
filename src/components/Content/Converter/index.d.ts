export default interface IConverter {
    session?: ISession;
    campaigns?: ICampaignsAPI;
}

export interface IFormData {
    mte: string;
    matic: string;
    try: string;
}