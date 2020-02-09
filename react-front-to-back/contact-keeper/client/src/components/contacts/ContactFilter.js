import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {
    const contactsContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactsContext;
    const filter = useRef('');

    useEffect(() => {
        if (filtered === null) {
            filter.current.value = '';
        }
    })

    const onFilter = e => {
        if (filter.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter()
        }
    }

    const onClear = e => {
        clearFilter()
    }

    return (
        <form style={{display: 'flex'}}>
            <input type="text" ref={filter} placeholder="Filter Contacts..." name="filter" onChange={onFilter}/>
        </form>
    )
}

export default ContactFilter;