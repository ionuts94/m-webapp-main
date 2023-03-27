import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { imageIsValid } from 'utils';
import {
  STATUS_ENDPOINT,
  EMPLOYEES_ENDPOINT,
  DEPARTMENTS_ENDPOINT,
  DEFAULT_PROFILE_PICTURE,
  EMPLOYEE_ACTIONS_ENDPOINTS,
  EDIT_PROFILE_PAGE,
  ADD_EMPLOYEE_PAGE,
  DEFAULT_PAGE_HEADER_COLOR,
  DEFAULT_PAGE_HEADER_TEXT_COLOR,
  REQUIRED_FORM_FIELDS,
  INVALID_FORM_MESSAGE,
  INVALID_IMAGE_MESSAGE
} from 'constants';
import {
  Input,
  Spinner,
  PageHeader,
  SaveButton,
  PageWrapper,
  DeleteButton,
  DisplayError,
  AddButton
} from 'components';
import {
  useEmployeeActions,
  useFetchEndpoint
} from 'hooks';
import './Profile.css';

// This component is used as a page - Edit profile page
// But it is also used as a component - Add employee page
export function Profile({ actionType = 'PUT' }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // This is used to differentiate the endpoint for when the form is submitted
  // Based on the action type. Current action types: POST , PUT, DELETE
  const endpoint = EMPLOYEE_ACTIONS_ENDPOINTS[actionType];

  // In case there's an ID passed in the route param
  // We know this is used for Edit Profile page 
  // Therefore we fetch employee data to prefill the form
  const {
    data,
    loading,
    error
  } = useFetchEndpoint(id && `${EMPLOYEES_ENDPOINT}/${id}` || null);

  const {
    data: departmentsData,
    loading: departmentsLoading,
    error: departmentsError
  } = useFetchEndpoint(DEPARTMENTS_ENDPOINT);

  const {
    data: statusData,
    loading: statusLoading,
    error: statusError
  } = useFetchEndpoint(STATUS_ENDPOINT);

  const {
    loading: employeePostLoading,
    error: employeePostError,
    handleEmployeeAction
  } = useEmployeeActions();

  // profileData is the actuall data that will be passed
  // when calling the api
  const [profileData, setProfileData] = useState({});
  const [lastValidImage, setLastValidImage] = useState('');

  useEffect(() => {
    async function prefillForm() {
      if (data && !Array.isArray(data)) {
        setProfileData(data);

        // Saving a last version of a valid image in case there's any
        // So we can restore to it if user enters a invalid image url
        const validImage = await imageIsValid(data.photo);
        if (validImage) {
          setLastValidImage(data.photo);
        }
      }
    }
    prefillForm();
  }, [data])

  // This is used when this component is used to add an employee
  // As there will be no pre-fill because 
  // there's no data we pulled from database for this profile
  // we will set department and status by default
  useEffect(() => {
    if (actionType === 'POST') {
      if (!profileData.department) {
        setProfileData(profileData =>
          ({ ...profileData, department: departmentsData[0]?.id }))
      }
      if (!profileData.status) {
        setProfileData(profileData =>
          ({ ...profileData, status: statusData[0]?.id }))
      }
    }
  }, [departmentsData, statusData])

  function handleInputChange(e) {
    setProfileData(profileData => ({
      ...profileData,
      [e.target.name]: e.target.value
    }))
  }

  // I could have done better form validation :)
  async function validateForm() {
    if (!profileData.name || !profileData.department || !profileData.status) {
      toast.error(INVALID_FORM_MESSAGE);
      return false;
    }
    if (profileData.photo) {
      const validImage = await imageIsValid(profileData.data);
      if (!validImage) {
        setProfileData(profileData => ({
          ...profileData,
          photo: lastValidImage
        }));
        toast.error(INVALID_IMAGE_MESSAGE)
        return false;
      }
    }
    return true;
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    const formValid = await validateForm();

    if (!formValid) {
      return
    };

    const done = await handleEmployeeAction(endpoint, profileData, actionType);
    if (done && actionType === 'POST') {
      redirectToEmployeesList();
    }
  }

  async function handleDeleteEmployee(e) {
    e.preventDefault();
    const formValid = validateForm();

    if (!formValid) {
      return;
    }

    const actionType = 'DELETE';
    const endpoint = EMPLOYEE_ACTIONS_ENDPOINTS[actionType];
    const done = await handleEmployeeAction(endpoint, profileData, actionType);
    if (done) {
      redirectToEmployeesList();
    }
  }

  function redirectToEmployeesList() {
    setTimeout(() => navigate('/view-employees'), 500)
  }

  // If any of those hooks are currently awaiting for response
  // We show Spinner component
  function componentIsLoading() {
    return loading || departmentsLoading || statusLoading || employeePostLoading
  }

  // If any of those hooks failed their request
  // We show DisplayError component
  function componentHasErrors() {
    return error || departmentsError || statusError || employeePostError
  }

  if (componentIsLoading()) {
    return <Spinner />
  }

  if (componentHasErrors()) {
    return <DisplayError
      error={error.toString()}
      redirectTo="/"
    />
  }

  return (
    <section className='profile-page'>
      <PageHeader
        color={DEFAULT_PAGE_HEADER_COLOR}
        textColor={DEFAULT_PAGE_HEADER_TEXT_COLOR}
      >
        {actionType === 'update'
          ? EDIT_PROFILE_PAGE
          : ADD_EMPLOYEE_PAGE
        }
      </PageHeader>

      <PageWrapper>
        <form onSubmit={handleSubmitForm}>
          <div className='profile-form-container'>
            <h2 className='profile-picture-header'>Prfile photo</h2>

            <img
              className="profile-picture"
              src={profileData?.photo || data?.photo || DEFAULT_PROFILE_PICTURE}
              alt='profile photo'
            />

            <Input
              name="photo"
              label="Photo Url"
              onChange={handleInputChange}
              value={profileData.photo}
            />

            <Input
              name="name"
              label="Name"
              onChange={handleInputChange}
              value={profileData.name}
              required
            />

            <Input
              as="select"
              name="department"
              label="Department"
              onChange={handleInputChange}
              value={profileData.department}
              required
            >
              {departmentsData.map(department => (
                <option
                  key={department.id}
                  name={department.name}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}
            </Input>

            <Input
              as="select"
              name="status"
              label="Status"
              onChange={handleInputChange}
              value={profileData.status}
              required
            >
              {statusData.map(status => (
                <option
                  key={status.id}
                  name={status.name}
                  value={status.id}
                >
                  {status.name}
                </option>
              ))}
            </Input>

            <span>{REQUIRED_FORM_FIELDS}</span>

            <div className='buttons-container'>
              {actionType === 'PUT'
                ? <>
                  <SaveButton>
                    Save Details
                  </SaveButton>
                  <DeleteButton
                    type='button'
                    onClick={handleDeleteEmployee}
                  >
                    Delete Entry
                  </DeleteButton>
                </>
                : <AddButton>
                  Add Employee
                </AddButton>
              }
            </div>

          </div>
        </form>
      </PageWrapper>
    </section>
  )
}
