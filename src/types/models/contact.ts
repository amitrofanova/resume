type ContactType = 'phone' | 'email' | 'messenger';

export default interface ContactItem {
  type: ContactType;
  value: string;
  preferable?: boolean;
}
