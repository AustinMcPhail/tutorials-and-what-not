import React, { useContext } from 'react'
import ContactContext from '../../context/contact/contactContext';
import PropTypes from 'prop-types'

const ContactItem = ({ contact }) => {
    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;
    const { id, name, email, phone, type } = contact;
    const onDelete = e => {
        deleteContact(id);
        clearCurrent();
    }
    const onEdit = e => {
        setCurrent(contact)
    }
    return (
        <div className="card bg-white">
            <h3 className="text-primary text-left">
                {name}{' '}<span style={{ float: 'right' }} className={'badge ' + (type === 'professional' ? 'badge-success' : 'badge-primary')}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
            </h3>
            <ul className="list">
                {email && (
                    <li>
                        <i className="fa fa-envelope-open"></i> {email}
                    </li>
                )}
                {phone && (
                    <li>
                        <i className="fa fa-phone"></i> {phone}
                    </li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={onEdit}>Edit</button>
                <button style={{ float: 'right' }} className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired,
}

export default ContactItem;