import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactTable = ({ contacts, deleteContact }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Ім'я</th>
                <th>Прізвище</th>
                <th>Телефон</th>
                <th>Дія</th>
            </tr>
            </thead>
            <tbody>
            {contacts.map((contact) => (
                <tr key={contact.id}>
                    <td>{contact.name}</td>
                    <td>{contact.surname}</td>
                    <td>{contact.phone}</td>
                    <td>
                        <button onClick={() => deleteContact(contact.id)}>Видалити</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const ContactItem = ({ contact }) => {
    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.surname}</td>
            <td>{contact.phone}</td>
        </tr>
    );
};

const AddContactForm = ({ addContact }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        addContact({ name, surname, phone });
        setName('');
        setSurname('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Ім'я:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Прізвище:
                <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} />
            </label>
            <label>
                Телефон:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <button type="submit">Зберегти</button>
            <button type="button" onClick={() => setName('')}>Скасувати</button>
        </form>
    );
};

const Contacts = () => {
    const [contacts, setContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setContacts(response.data.map(user => ({
                    id: user.id,
                    name: user.name,
                    surname: user.username,
                    phone: user.phone
                })));
            })
            .catch(error => {
                console.log('Error fetching data:', error);
            });
    }, []);

    const addContact = (newContact) => {
        setContacts([...contacts, { ...newContact, id: contacts.length + 1 }]);
        setShowForm(false);
    };

    const deleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    return (
        <div>
            <h1>Список контактів</h1>
            <ContactTable contacts={contacts} deleteContact={deleteContact} />
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Приховати форму' : 'Додати контакт'}
            </button>
            {showForm && <AddContactForm addContact={addContact} />}
        </div>
    );
};

export default Contacts;
