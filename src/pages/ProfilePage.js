import { useState, useEffect } from 'react';
import api from '../api/library.api';

function ProfilePage () {
  const [ profile, setProfile ] = useState(null);
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  const [ file, setFile ] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const user = await api.getProfile();
      setProfile(user);
    }
    fetchProfile();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('profileImage', file);
    try {
      await api.updateAvatar(formData);
      const user = await api.getProfile();
      setProfile(user);
    } catch (error) {
      console.log('ERRO!', error);
    }
  }

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  }

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  return(
    <div className="ProfilePage">
      {!profile && <div>Loading...</div>}

      {profile && (
        <>
          <div className="avatar">
            <img src={profile.avatarUrl} alt='profile' />
          </div>
          <button onClick={toggleForm}>{isFormOpen ? 'Cancel' : 'Change Avatar'}</button>
          <div>
            <h2>{profile.username}</h2>
          </div>
          {isFormOpen && (
            <form onSubmit={handleSubmit}>
              <input type='file' onChange={handleFile} />
              <button type='submit'>Save</button>
            </form>
          )}
        </>
      )}
    </div>
  )
}

export default ProfilePage;