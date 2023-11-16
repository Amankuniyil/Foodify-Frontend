import React, { useState, useEffect } from 'react';
import api from '../../api/axiosConfig';
import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    maxWidth: '80%', // Set the maximum width to 80% of the parent container
    width: 'auto',  // Set width to auto to allow it to adjust based on content
    padding: '20px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

function UserEditProfileModal({ userId, updateProfileData, isOpen, closeModal }) {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    username: '',
  });

  useEffect(() => {
    if (!userId) {
      return; // If userId is not available, do nothing
    }

    // Fetch user profile data
    api.get(`users/user-profile/${userId}/`)
      .then((response) => {
        const userData = response.data;

        // Set the initial state of formData with the fetched data
        setFormData({
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone_number: userData.phone_number,
          email: userData.email,
          username: userData.username,
        });
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  async function handleSubmit() {
    try {
      const response = await api.put(`users/user-profile/`, formData);
      console.log('Profile data updated successfully:', response.data);
      // You might want to perform additional actions after a successful update
    } catch (error) {
      console.error('Error updating profile data:', error);
    }
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Profile Modal"
      overlayClassName="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-70"
      className="fixed inset-0 flex items-center justify-center z-50"
      
    >
      <div className="w-full flex flex-col 2xl:w-1/3">
        <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
          <h4 className="text-xl text-gray-900 font-bold">Edit Personal Info</h4>
          <form>
            <div className="mt-2 text-gray-700">
              <div className="flex border-y py-2">
                <span className="font-bold w-24">First Name:</span>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
              </div>
              <p>{userId}</p>

              <div className="flex border-b py-2">
                <span className="font-bold w-24">Last Name:</span>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex border-b py-2">
                <span className="font-bold w-24">Mobile:</span>
                <input
                  type="text"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex border-b py-2">
                <span className="font-bold w-24">Username:</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <button onClick={handleSubmit}>Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}

export default UserEditProfileModal;
