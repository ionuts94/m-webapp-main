import React, { useState, useEffect } from 'react';
import { PageWrapper, Input, PageHeader } from 'components';
import { useFetchEmployee } from 'hooks';
import { useParams } from 'react-router-dom';
import './Profile.css';

const ENDPOINT = 'employees';
const DEFAULT_PROFILE_PHOTO = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export function Profile() {
  const { id } = useParams();
  const { data, loading, error } = useFetchEmployee(`${ENDPOINT}/${id}`);
  const [profileData, setProfileData] = useState({})
  console.log(profileData);

  useEffect(() => {
    if (data) {
      setProfileData(data);
    }
  }, [data])

  function handleInputChange(e) {
    setProfileData(profileData => ({
      ...profileData,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <section className='profile-page'>
      <PageHeader color="#008CC9" textColor="#fff">EDIT PROFILE</PageHeader>
      <PageWrapper>
        <form>
          <div className='profile-picture-container'>
            <h2 className='profile-picture-header'>Prfile photo</h2>

            <img
              className="profile-picture"
              src={profileData?.profilePhoto || data?.profilePhoto || DEFAULT_PROFILE_PHOTO}
              alt='profile photo'
            />
            <Input
              name="profilePhoto"
              label="Photo Url"
              onChange={handleInputChange}
              value={profileData.profilePhoto}
            />

            <Input
              name="name"
              label="Name"
              onChange={handleInputChange}
              value={profileData.name}
            />

            <Input
              as="select"
              name="department"
              label="Department"
              onChange={handleInputChange}
              value={profileData.department}
            >
              <option name="hr" value="hr">HR</option>
              <option name="it" value="it">IT</option>
            </Input>

            <Input
              as="select"
              name="status"
              label="Status"
              onChange={handleInputChange}
              value={profileData.status}
            >
              <option name="active" value="active">active</option>
              <option name="inactive" value="inactive">inactive</option>
              <option name="holiday" value="holiday">holiday</option>
            </Input>

          </div>
        </form>
      </PageWrapper>
    </section>
  )
}
