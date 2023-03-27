import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdModeEditOutline } from "react-icons/md";
import {
  Label,
  Table,
  Avatar,
  Spinner,
  AddButton,
  PageHeader,
  PageWrapper,
  DisplayError,
} from 'components';
import {
  EMPLOYEES_ENDPOINT,
  VIEW_EMPLOYEES_PAGE,
  DEFAULT_PAGE_HEADER_COLOR,
  DEFAULT_PAGE_HEADER_TEXT_COLOR
} from 'constants';
import { useFetchEndpoint } from 'hooks';
import './Employees.css';

export function Employees() {
  const navigate = useNavigate();

  // The above line is responsible for All Employees fetching
  const { data, loading, error } = useFetchEndpoint(EMPLOYEES_ENDPOINT);

  function editProfile(id) {
    navigate(`/profile/${id}`);
  }

  // If the hook is awaing for response
  // We show Spinner component
  if (loading) {
    return <Spinner />
  }

  // If the hook failed request
  // We show DisplayError component
  if (error) {
    return <DisplayError
      error={error.toString()}
      redirectTo="/"
    />
  }

  return (
    <section className='employees-page'>
      <PageHeader
        color={DEFAULT_PAGE_HEADER_COLOR}
        textColor={DEFAULT_PAGE_HEADER_TEXT_COLOR}
        backTo='/'
      >
        {VIEW_EMPLOYEES_PAGE}
      </PageHeader>

      <PageWrapper>
        <div className='page-header'>
          <div className='text-container'>
            <h1>Employees List</h1>
            <p>Manage all your employees</p>
          </div>
          <Link to="/insert-employee">
            <AddButton>
              + Add Employee
            </AddButton>
          </Link>
        </div>

        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header>ID</Table.Header>
              <Table.Header>Employee</Table.Header>
              <Table.Header hideOnMobile>Department</Table.Header>
              <Table.Header hideOnMobile>Location</Table.Header>
              <Table.Header>Status</Table.Header>
              <Table.Header>Edit</Table.Header>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            {data.map(employee => (
              <Table.Row key={employee.id}>
                <Table.Data>
                  {employee.id}
                </Table.Data>

                <Table.Data>
                  <Avatar
                    name={employee.name}
                    photoUrl={employee.photo}
                  />
                </Table.Data>

                <Table.Data hideOnMobile>
                  {employee.department || "N/A"}
                </Table.Data>

                <Table.Data hideOnMobile>
                  {employee.location || "N/A"}
                </Table.Data>

                <Table.Data>
                  <Label state={employee.status || 'active'} />
                </Table.Data>

                <Table.Data>
                  <MdModeEditOutline
                    onClick={() => editProfile(employee.id)}
                    className='edit-button'
                    color='#3a7cff'
                    size={22}
                  />
                </Table.Data>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

      </PageWrapper>
    </section>
  )
}
