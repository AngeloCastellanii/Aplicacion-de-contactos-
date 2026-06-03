import { createContext, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import * as contactsService from '../services/contactsService';

export const ContactsContext = createContext(null);

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = useState(() => contactsService.getAllContacts());

  const refresh = useCallback(() => {
    setContacts(contactsService.getAllContacts());
  }, []);

  const addContact = useCallback(
    (payload) => {
      const created = contactsService.createContact(payload);
      refresh();
      return created;
    },
    [refresh],
  );

  const updateContact = useCallback(
    (id, payload) => {
      const updated = contactsService.updateContact(id, payload);
      if (updated) refresh();
      return updated;
    },
    [refresh],
  );

  const removeContact = useCallback(
    (id) => {
      const removed = contactsService.deleteContact(id);
      if (removed) refresh();
      return removed;
    },
    [refresh],
  );

  const value = useMemo(
    () => ({
      contacts,
      addContact,
      updateContact,
      removeContact,
      refresh,
    }),
    [contacts, addContact, updateContact, removeContact, refresh],
  );

  return (
    <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
  );
}

ContactsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
