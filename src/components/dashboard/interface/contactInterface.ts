export interface PhoneInterface {
  phone_id: number;
  phone_number: number;
  label?: string;
}

export default interface ContactInterface {
  contact_id: number;
  name: string;
  is_favorite?: boolean;
  email?: string;
  address?: string;
  picture?: string;
  user_id: number;
  phone_number: number;
  phone_id: number;
  label: string;
}

export interface contactIdProps {
  contactId: number;
}

export interface contactInterfaceProps {
  data: ContactInterface;
}

export interface ReloadHandlerProps {
  reloadHandler: () => void;
}

export interface contactWithReloaderProps {
  data: ContactInterface;
  reloadHandler: () => void;
}
