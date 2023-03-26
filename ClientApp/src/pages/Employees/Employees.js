import React from 'react';
import { Label, Spinner, PageWrapper, AddEmployeeButton, Table, DisplayError } from 'components';
import { MdModeEditOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useFetchEmployees } from 'hooks';
import './Employees.css';

const ENDPOINT = 'employees';

export function Employees() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetchEmployees(ENDPOINT);

  function editProfile(id) {
    navigate(`/profile/${id}`);
  }

  console.log(data);

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <DisplayError
      error={error.toString()}
      redirectTo="/"
    />
  }

  return (
    <section className='employees-page'>
      <div style={{ height: '50px' }}></div>
      <PageWrapper>
        <div className='page-header'>
          <div className='text-container'>
            <h1>Employees List</h1>
            <p>Manage all your employees</p>
          </div>
          <AddEmployeeButton>
            + Add Employee
          </AddEmployeeButton>
        </div>

        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Header>ID</Table.Header>
              <Table.Header>Employee</Table.Header>
              <Table.Header hideOnMobile>Department</Table.Header>
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {/* TODO - Extract this div into its own component */}
                    {employee.picture ||
                      <img
                        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        alt="default-avatar"
                        style={{ height: 40, width: 40, borderRadius: '50%' }}
                      />
                    }
                    {employee.name}
                  </div>
                </Table.Data>

                <Table.Data hideOnMobile>
                  {employee.department || "N/A"}
                </Table.Data>

                <Table.Data>
                  <Label state={employee.state || 'active'} />
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
