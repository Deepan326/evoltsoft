

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChargerPage = () => {
  const [chargers, setChargers] = useState([]);
  const [newCharger, setNewCharger] = useState({
    name: '',
    location: '',
    status: '',
    power_output:'',
    connector_type: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchChargers = async () => {
       const baseUrl= import.meta.env.VITE_URL
      const endpoints=`/charging/tasks`
      const url=`${baseUrl}${endpoints}`
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setChargers(data.tasks);
          toast.success(data.message || 'Chargers fetched successfully!');
        } else {
          toast.error('Failed to load chargers.');
        }
      } catch (err) {
        toast.error('Error fetching chargers.');
      }
    };

    fetchChargers();
  }, []);

  const handleAddCharger = async () => {
    try {
        const baseUrl= import.meta.env.VITE_URL
      const endpoints=`/charging/task`
      const url=`${baseUrl}${endpoints}`
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCharger),
      });
      const data = await response.json();
console.log(data);
      if (data.success) {
        setChargers([...chargers, data.task]);
        setNewCharger({ name: '', location: '', status: '', power_output: '', connector_type: '' });
        toast.success(data.message || 'Charger added successfully!');
      } else {
        toast.error('Failed to add charger.');
      }
    } catch (err) {
      toast.error('Failed to add charger.');
    }
  };

  const handleDeleteCharger = async (id) => {
      const baseUrl= import.meta.env.VITE_URL
      const endpoints=`/charging/task/${id}`
      const url=`${baseUrl}${endpoints}`
    try {
      await fetch(url, { method: 'DELETE' });
      setChargers(chargers.filter((charger) => charger._id !== id));
      toast.success('Charger deleted successfully!');
    } catch (err) {
      toast.error('Failed to delete charger.');
    }
  };

  const handleUpdateCharger = async () => {
    try {
        const baseUrl= import.meta.env.VITE_URL
      const endpoints=`/charging/task/${editId}`
      const url=`${baseUrl}${endpoints}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCharger),
      });

      const data = await response.json();
      if (data.success) {
        setChargers(chargers.map((c) => (c._id === editId ? data.task : c)));
        toast.success('Charger updated successfully!');
        setNewCharger({ name: '', location: '', status: '', power_output: '', connector_type: '' });
        setEditId(null);
      } else {
        toast.error('Failed to update charger.');
      }
    } catch (err) {
      toast.error('Failed to update charger.');
    }
  };

  const handleEditClick = (charger) => {
    setEditId(charger._id);
setNewCharger({
  name: charger.name,
  location: charger.location,
  status: charger.status,
  power_output: charger.power_output,
  connector_type: charger.connector_type,
});
  };

return (
  <div className='charger-list' style={{ padding: '20px' }}>
    <ToastContainer />
    <h2>Charger List</h2>

    <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Status</th>
          <th>Power Output</th>
          <th>Connector Type</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {chargers.map((charger) => (
          <tr key={charger._id}>
            <td>{charger.name}</td>
            <td>{charger.location}</td>
            <td>{charger.status}</td>
            <td>{charger.power_output}</td>
            <td>{charger.connector_type}</td>
            <td>
              <button onClick={() => handleEditClick(charger)}>Edit</button>{' '}
              <button onClick={() => handleDeleteCharger(charger._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <h3 style={{ marginTop: '40px' }}>{editId ? 'Edit Charger' : 'Add New Charger'}</h3>
    <div className='new-charger' style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', gap: '10px' 
      
    }}>
      <input
        type="text"
        placeholder="Name"
        value={newCharger.name}
        onChange={(e) => setNewCharger({ ...newCharger, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Location"
        value={newCharger.location}
        onChange={(e) => setNewCharger({ ...newCharger, location: e.target.value })}
      />
      <input
        type="text"
        placeholder="Status"
        value={newCharger.status}
        onChange={(e) => setNewCharger({ ...newCharger, status: e.target.value })}
      />
      <input
        type="number"
        placeholder="Power Output"
        value={newCharger.power_output}
        onChange={(e) => setNewCharger({ ...newCharger, power_output: e.target.value })}
      />
      <input
        type="text"
        placeholder="Connector Type"
        value={newCharger.connector_type}
        onChange={(e) => setNewCharger({ ...newCharger, connector_type: e.target.value })}
      />
      {editId ? (
        <button onClick={handleUpdateCharger}>Update Charger</button>
      ) : (
        <button className='add-charger' onClick={handleAddCharger}>Add Charger</button>
      )}
    </div>
  </div>
);

};

export default ChargerPage;
