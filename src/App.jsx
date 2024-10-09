import React, { useState, useRef } from 'react';
import { FaBars } from "react-icons/fa6";
import DataTable from 'react-data-table-component';

const initialData = [
    {
        name: 'Carla Murphy',
        email: 'carla.selise.test@yopmail.com',
        role: 'Candidate of HFP Bauleiter',
        phone: '+49*******25',
        dateCreated: '22.01.2023'
    },
    {
        name: 'Georgia Weber',
        email: 'georgia.selise.test@yopmail.com',
        role: 'Candidate of HFP Bauleiter',
        phone: '+49*******22',
        dateCreated: '22.01.2023'
    },
    
];

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.role,
        sortable: true,
    },
    {
        name: 'Phone Number',
        selector: row => row.phone,
        sortable: true,
    },
    {
        name: 'Date Of Birth',
        selector: row => row.dateCreated,
        sortable: true,
    }
];

const User = () => {
    const [filterText, setFilterText] = useState('');
    const [filteredData, setFilteredData] = useState(initialData);
    const [data, setData] = useState(initialData);

    
    const formRef = useRef(null);

    
    const handleSearch = (event) => {
        const searchQuery = event.target.value.toLowerCase();
        setFilterText(searchQuery);

        const filtered = data.filter((user) =>
            user.name.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery) ||
            user.phone.toLowerCase().includes(searchQuery)
        );
        setFilteredData(filtered);
    };

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        city: '',
        phone: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        
        const newUser = {
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            role: 'New User',  
            phone: user.phone,
            dateCreated: new Date().toLocaleDateString(),
            lastLogin: new Date().toLocaleDateString(),
        };

        
        setData((prevData) => [...prevData, newUser]);
        setFilteredData((prevData) => [...prevData, newUser]);

        
        setUser({
            firstName: '',
            lastName: '',
            gender: '',
            dateOfBirth: '',
            city: '',
            phone: '',
            email: '',
        });
    };

    
    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div>

            <div style={{ margin: 20, display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                <div style={{ width: '260px' }}>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                        <FaBars />
                    </div>
                    <div style={{ marginTop: 12 }}>
                        <p style={{ padding: 6, backgroundColor: 'blue', color: 'white', borderRightStyle: 0, borderRadius: '12px' }}>User</p>
                    </div>
                </div>

                <div>
                    <div style={{ width: '1100px', padding: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h2>Users</h2>
                            {}
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={filterText}
                                    onChange={handleSearch}
                                    style={{ padding: 8, marginBottom: 20, width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
                                />
                                <button onClick={scrollToForm} style={{ height: '70%' }}>Create User</button>
                            </div>
                        </div>

                        {}
                        <DataTable
                            columns={columns}
                            data={filteredData}
                            pagination
                            highlightOnHover
                        />
                    </div>
                </div>
            </div>

            <div ref={formRef}>
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h3>Create User</h3>

                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        First Name 
                        <input
                            type="text"
                            name="firstName"
                            placeholder='2-50 chars'
                            value={user.firstName}
                            onChange={handleChange}
                            required
                            minLength="2"
                            maxLength="50"
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        Last Name 
                        <input
                            type="text"
                            placeholder='2-50 chars'
                            name="lastName"
                            value={user.lastName}
                            onChange={handleChange}
                            required
                            minLength="2"
                            maxLength="50"
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        Gender
                        <select
                            name="gender"
                            value={user.gender}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>

                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        Date of Birth
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={user.dateOfBirth}
                            onChange={handleChange}
                            required
                            max={new Date().toISOString().split('T')[0]} 
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        City
                        <input
                            type="text"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        Phone (valid phone no)
                        <input
                            type="tel"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}" 
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                    </label>

                    <label style={{ display: 'block', marginBottom: '8px' }}>
                        Email (valid email)
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
                        />
                    </label>

                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default User;
